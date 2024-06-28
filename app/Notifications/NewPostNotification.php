<?php

namespace App\Notifications;

use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class NewPostNotification extends Notification implements ShouldQueue, ShouldBroadcast
{
    use Queueable;
    public $postId;
    public $userId;
    /**
     * Create a new notification instance.
     */
    public function __construct($post, $userId)
    {
        //
        $this->postId = $post->id;
        $this->userId = $userId;
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
    //         ->line('The introduction to the notification. Let\'s try')
    //         ->action('Notification Action', url('/'))
    //         ->line('Thank you for using our application!');
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
            'userId' => $this->userId,
            'postId' => $this->postId,
            'message' => "has created a new post"
        ];
    }

    public function databaseType(object $notifiable): string
    {
        return 'new-post-created';
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        $notificationData = DatabaseNotification::where('id', $this->id)->first(); 
            
            // Log::info('BroadcastMessage:', (array) $broadcastData);
        return new BroadcastMessage($notificationData->toArray());
    }

    // public function broadcastType()
    // {
    //     return 'new-post';
    // }
}
