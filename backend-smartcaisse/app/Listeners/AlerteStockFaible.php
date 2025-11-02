<?php

namespace App\Listeners;

use App\Events\StockFaible;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\User;

use App\Notifications\StockFaibleNotification;



class AlerteStockFaible
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
   public function handle(StockFaible $event)
{
    $admins = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))->get();
    foreach ($admins as $admin) {
        $admin->notify(new StockFaibleNotification($event->produit));
        #$admin->notify(new \App\Notifications\StockFaibleNotification($event->produit));
    }
}

}
