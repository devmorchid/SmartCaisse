<?php

namespace App\Listeners;

use App\Events\NouvelleVenteCreee;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\User;
use App\Notifications\NouvelleVenteNotification;



class EnvoyerNotificationVente
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
      public function handle(NouvelleVenteCreee $event)
    {
        // 🔔 Envoi notification à l’admin
        $admins = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))->get();

        foreach ($admins as $admin) {
            $admin->notify(new NouvelleVenteNotification($event->vente));
        }
    }
   
}
