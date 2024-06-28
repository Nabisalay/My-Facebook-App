<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostLikedNotification extends Notification implements ShouldQueue, ShouldBroadcast
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $like;

    public function __construct($like)
    {
        //
        $this->like = $like;

        // dd( $this->like['user_id']);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        
        return ['database', 'broadcast'];
        
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //                 ->line('The introduction to the notification.')
    //                 ->action('Notification Action', url('/'))
    //                 ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        
        return [
            //
            'userId' => $this->like['user_id'],
            'postId' => $this->like['post_id'],
            'message' => "has like your post"
        ];
    }

    public function databaseType(object $notifiable): string
    {
        return 'post-liked';
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        $notificationData = DatabaseNotification::where('id', $this->id)->first(); 
        // dd($notificationData);
        return new BroadcastMessage($notificationData->toArray());
    }
}
