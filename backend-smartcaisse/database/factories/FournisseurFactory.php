<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fournisseur>
 */
class FournisseurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->company(),
            'email' => $this->faker->unique()->companyEmail(),
            'telephone' => $this->faker->phoneNumber(),
            'adresse' => $this->faker->address(),
            'user_id' => User::factory(),
        ];
    }
}
