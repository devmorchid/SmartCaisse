<?php

namespace Database\Seeders;
use App\Models\User;
use Laratrust\Models\Role;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
  public function run(): void
{
    $this->call(LaratrustSeeder::class);


    // Création d'un admin par défaut
     $admin = User::create([
        'name' => 'Admin',
        'email' => 'admin@caisse.com',
        'password' => bcrypt('12345678'),
    ]);
    $admin->addRole('admin');
    
}
}
