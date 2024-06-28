<?php

namespace App\Events;

use App\Models\PostLikes;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostLikedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    public $post;

    public $like;

    public function __construct($validated)
    {
        // dd($validated);
        $this->post = $validated['post_id'];

        $like = PostLikes::where('post_id', $validated['post_id'])
            ->where('user_id', $validated['user_id'])
            ->with('user')
            ->first();

        $this->like = $like ? $like->toArray() : $validated['user_id'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new Channel('post-like');
    }

    public function broadcastWith()
    {
        return ['post' => $this->post, 'like' => $this->like];
    }
}
