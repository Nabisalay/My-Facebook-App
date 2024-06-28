<?php

namespace App\Http\Controllers;

use App\Events\RequestReceivedEvent;
use App\Models\FriendRequestModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FriendController extends Controller
{
    //
    public function show()
    {
        $userId = Auth::id();
        $alreadyFriends = User::findOrFail($userId)->friends()->pluck('id');
        $alreadyFriends->push($userId);
        $friends = User::whereNotIn('id', $alreadyFriends)
            ->with('requestReceived')
            ->get();
        return Inertia::render('Friends', [
            'friends' => $friends,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => ['required', 'integer'],
        ]);

        FriendRequestModel::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
        ]);

        event(new RequestReceivedEvent($request->receiver_id));

        return redirect()->route('friends');
    }

    public function cancelFriendRequest(Request $request)
    {
        $request->validate([
            'receiver_id' => ['required', 'integer'],
        ]);

        FriendRequestModel::where('sender_id', Auth::id())
            ->where('receiver_id', $request->receiver_id)->delete();

        event(new RequestReceivedEvent($request->receiver_id));


        return redirect()->route('friends');
    }

    public function showRequest()
    {
        $userId = Auth::id();
        $friendRequests = FriendRequestModel::where('receiver_id', $userId)
            ->where('status', 'pending')
            ->with('sender')
            ->get();
        //   dd($friendRequests);
        return Inertia::render('FriendRequests', [
            'friendRequests' => $friendRequests,
        ]);
    }

    public function showMyFriends()
    {

        $MyFriends = Auth::user()->friends();

        return Inertia::render('MyFriends', [
            'MyFriends' => $MyFriends,
        ]);
    }

    public function acceptRequest(Request $request)
    {
        $request->validate([
            'receiver_id' => ['required', 'integer'],
            'sender_id' => ['required', 'integer'],
        ]);
        if (Auth::id() !== $request->receiver_id) {
            abort(403);
        }
        FriendRequestModel::where('sender_id', $request->sender_id)
            ->where('receiver_id', Auth::id())
            ->update(['status' => 'accepted', 'became_friend_at' => now()]);

        return redirect()->route('friend.requests');
    }
}
