<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'gender',
        'profile_img',
        'dob',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function requestSent()
    {
        $userId = Auth::id();
        // dd($userId);
        return $this->hasMany(FriendRequestModel::class, 'sender_id')
            ->where('receiver_id', $userId)
            ->where('status', 'pending');
    }

    public function requestReceived()
    {
        $userId = Auth::id();
        return $this->hasMany(FriendRequestModel::class, 'receiver_id')
            ->where('sender_id', $userId)
            ->where('status', 'pending');
    }

    public function getSentFriends()
    {
        return $this->belongsToMany(User::class, 'friend_requests', 'sender_id', 'receiver_id')
            ->wherePivot('status', 'accepted')
            ->withPivot('status');
    }

    public function getReceivedFriends()
    {
        return $this->belongsToMany(User::class, 'friend_requests', 'receiver_id', 'sender_id')
            ->wherePivot('status', 'accepted')
            ->withPivot('status');
    }

    public function friends()
    {
        $friendsOfMine = $this->getSentFriends()->get();
        $friendOf = $this->getReceivedFriends()->get();
        return $friendsOfMine->merge($friendOf);
    }

   


    public function posts()
    {
        return $this->hasMany(Post::class);
    }



    public function receivesBroadcastNotificationsOn()
    {
        return 'App.User.' . $this->id;
    }
}
