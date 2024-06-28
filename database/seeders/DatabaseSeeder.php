<?php

namespace Database\Seeders;

use App\Models\FriendRequestModel;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        User::factory()->create([
            'firstName' => 'Salas',
            'lastName' => 'Sadiq',
            'gender' => 'Male',
            'email' => 'salassadiq187@gmail.com',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'firstName' => 'Nabi',
            'lastName' => 'Salay',
            'gender' => 'Male',
            'email' => 'salastelecomagent@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::factory(20)->create();

        FriendRequestModel::factory(20)->create();
    }
}
