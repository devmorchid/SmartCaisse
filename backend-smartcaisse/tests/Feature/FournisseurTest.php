<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;
use App\Models\Fournisseur;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FournisseurTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function admin_can_get_all_fournisseurs()
    {
       
        $admin = User::factory()->create();
        $admin->addRole('admin');

       
        Fournisseur::factory()->count(3)->create();

      
        $response = $this->actingAs($admin, 'sanctum')
                         ->getJson('/api/fournisseurs');

        
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function manager_can_only_see_his_own_fournisseurs()
    {
        
        $manager = User::factory()->create();
        $manager->addRole('Manager');

        
        Fournisseur::factory()->count(2)->create(['user_id' => $manager->id]);

       
        Fournisseur::factory()->count(3)->create();

       
        $response = $this->actingAs($manager)
                         ->getJson('/api/fournisseurs');

     
        $response->assertStatus(200)
                ->assertJsonCount(2);
    }

    /** @test */
    public function user_without_role_cannot_access_fournisseurs()
    {
        $user = User::factory()->create(); 

        $response = $this->actingAs($user, 'sanctum')
                         ->getJson('/api/fournisseurs');

        $response->assertStatus(403)
                 ->assertJson([
                     'message' => 'Accès refusé'
                 ]);
        
    }
}
