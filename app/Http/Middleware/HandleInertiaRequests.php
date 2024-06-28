<?php

namespace App\Http\Middleware;

use App\Models\FriendRequestModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userId = $request->user()->id ?? 1;
        $requests = FriendRequestModel::where('receiver_id', $userId)
        ->where('status', 'pending')
        ->count();
        $notificatonCount = User::find($userId)->notifications->where('seen', false)->count();
        $notificatons = User::find($userId)->notifications;
        $friends = User::find($userId)->friends();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'friendRequests' => $requests,
            'notifications' => $notificatons,
            'notificatonCount' => $notificatonCount,
            'friends' => $friends,
        ];
    }
}
