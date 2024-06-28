<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/practice', function() {
    return Inertia::render('Practice/Practice', [
        'user' => 'Salas Sadiq',
    ]);
})->name('practice1');
Route::inertia('/practice', 'Practice/Practice')
    ->name('practice');
