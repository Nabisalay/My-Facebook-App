<?php

namespace App\Http\Controllers;

use App\Events\NewPostCreated;
use App\Events\PostLikedEvent;
use App\Models\Post;
use App\Models\PostLikes;
use App\Models\User;
use App\Notifications\NewPostNotification;
use App\Notifications\PostLikedNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PostHandleController extends Controller
{
    //

    public function index(Request $request)
    {

        $userId = Auth::id();
        $friendIds = User::findOrFail($userId)->friends()->pluck('id');
        $friendIds->push($userId);
        $posts = Post::latest()
            ->whereIn('user_id', $friendIds)
            ->with(['user', 'likes.user'])
            ->paginate(5);

        if ($request->wantsJson()) {
            return response()->json($posts);
        }
        return Inertia::render('Welcome', [
            'posts' => $posts,
        ]);
    }

    public function addPost(Request $request)
    {
        
        $user = Auth::user();
        $request->validate([
            'postText' => ['required_without_all:postImage,postVideo', 'string', "nullable"],
            'postImage' => [
                'required_without_all:postText,postVideo',
                function ($attribute, $value, $fail) {
                    if (request()->hasFile($attribute)) {
                        $rules = ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'];
                        $validator = Validator::make(request()->all(), [$attribute => $rules]);
                        if ($validator->fails()) {
                            $fail($validator->errors()->first($attribute));
                        }
                    }
                },
            ],
            'postVideo' => [
                'required_without_all:postText,postImage',
                function ($attribute, $value, $fail) {
                    if (request()->hasFile($attribute)) {
                        $rules = ['mimetypes:video/mp4'];
                        $validator = Validator::make(request()->all(), [$attribute => $rules]);
                        if ($validator->fails()) {
                            $fail($validator->errors()->first($attribute));
                        }
                    }
                }
            ]
        ]);
        if (!!$request->file('postImage')) {
            $imagePath = $request->file('postImage')->store('images', 'public');
        } else 
        if (!!$request->file('postVideo')) {
            $videoPath = $request->file('postVideo')->store('videos', 'public');
        }

        $post = Post::create([
            'user_id' => Auth::id(),
            'description' => $request->postText,
            'type' => $request->postImage ? 'imagePost' : ($request->postVideo ? 'videoPost' : 'text'),
            'image' => $request->postImage ? $imagePath : ($request->postVideo ? $videoPath : null),

        ]);
        $fullPost = Post::with(['user', 'likes.user'])->find($post->id);

        event(new NewPostCreated($fullPost));

        $friends = User::findOrFail($user->id)->friends();

        Notification::send($friends, new NewPostNotification($post, $user->id));

        return response(['message' => 'New post created Successfully', 'success' => true]);
    }

    public function likePost(Request $request)
    {


        $validate = $request->validate([
            'post_id' => ['required'],
            'user_id' => ['required'],
            'liked' => ['required'],

        ]);


        // 
        $existedliked = PostLikes::where('post_id', $request->post_id)
            ->where('user_id', $request->user_id)
            ->where('liked', $request->liked)->first();
        if ($existedliked) {
            $existedliked->delete();
            $success = false;
            $postLike = null;
        } else {
            PostLikes::create($validate);

            $success = true;
        }


        event(new PostLikedEvent($validate));
        $post = Post::find($request->post_id);
        $user = $post->user;

        if ($user->id !== $request->user_id) {
            if (!$existedliked) {
                $user->notify(new PostLikedNotification($validate));
            } else {
                $user->notifications()
                    ->where('type', 'post-liked')
                    ->whereJsonContains('data', [
                        'userId' => $request->user_id,
                        'postId' => $request->post_id,
                    ])->delete();
            }
        };

        $data = $success ? PostLikes::where('post_id', $request->post_id)
            ->where('user_id', $request->user_id)
            ->with('user')
            ->first() : $request->user_id;
        return response(["success" => $success, 'data' => $data]);
    }

    public function notificationSeen()
    {
        $userId = Auth::id();
        User::findOrFail($userId)->notifications()
            ->where('seen', false)
            ->update(['seen' => true]);

        return response(
            [
                'message' => 'Notifications has been seen',
                'success' => true
            ]
        );
    }

    public function showNotificationPost(Request $request)
    {
        $userId = auth()->user()->id;
        $request->validate([
            'postId' => ['required'],
            'notificationId' => ['required'],
        ]);
        User::findOrFail($userId)
            ->unreadNotifications()
            ->where('id', $request->notificationId)
            ->update(['read_at' => Carbon::now()]);
        $post = Post::with(['user', 'likes.user'])->findOrFail($request->postId);
        // dd( $post);

        return Inertia::render('Welcome', [
            'posts' => [
                'data' => [$post],
                'current_page' => 1,
                'from' => 1,
                'to' => 1,
                'per_page' => 1,
                'total' => 1,
                'last_page' => 1,
                'next_page_url' => null,
                'prev_page_url' => null,
            ],
        ]);
    }
}
