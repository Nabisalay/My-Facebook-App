<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FriendRequestModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sender_id = $this->faker->randomElement([0, 1]);
        if ($sender_id === 0) {
            $sender_id = $this->faker
            ->randomElement(User::where('id', '!=', 1)
               ->pluck('id')->toArray());
            $receiver_id = 1;
        } else {
            $receiver_id =$this->faker
                ->randomElement(
                    User::pluck('id')
                    ->toArray()
                );
        }
        if($this->faker->boolean(50)) {
            $status = "accepted";
        }else {
            $status = "pending";
        }
        return [
            //
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'status' => $status,
        ];
    }
}
