<?php

use App\Http\Controllers\FriendController;
use App\Http\Controllers\PostHandleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', [PostHandleController::class, 'index'])->name('welcome');
    Route::post('/like/post', [PostHandleController::class, 'likePost'])->name('likePost');
    Route::get('friends', [FriendController::class, 'show'])->name('friends');
    Route::get('myfriends', [FriendController::class, 'showMyFriends'])->name('myFriends');
    Route::get('friend/request', [FriendController::class, 'showRequest'])->name('friend.requests');
    Route::post('/add/profile', [ProfileController::class, 'uploadProfileImage'])->name('addProfile');
    Route::post('friend/request', [FriendController::class, 'store'])->name('sendRequest');
    Route::post('friend/request/cancel', [FriendController::class, 'cancelFriendRequest'])->name('cancelRequest');
    Route::post('friend/request/accept', [FriendController::class, 'acceptRequest'])->name('friend.request.accept');
    Route::post('add/post', [PostHandleController::class, 'addPost'])->name('add.post');
    Route::post('notification/seen', [PostHandleController::class, 'notificationSeen'])->name('sawNotifications');
    Route::get('notification/show/post/', [PostHandleController::class, 'showNotificationPost'])->name('showNotificationPost');
    Route::get('/{user}/{id}', [ProfileController::class, 'userProfile'])->name('showProfile');

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// require __DIR__.'/practice.php';
