<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class NouvelleVenteNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */  
    protected $vente;

    public function __construct($vente)
    {
        $this->vente = $vente;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
      public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Nouvelle vente créée')
                    ->greeting('Bonjour !')
                    ->line('Une nouvelle vente a été enregistrée.')
                    ->line('Total : ' . $this->vente->total . ' MAD')
                    ->action('Voir la vente', url('/ventes/' . $this->vente->id));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
     public function toArray($notifiable)
    {
        return [
            'vente_id' => $this->vente->id,
            'total' => $this->vente->total,
            'user' => $this->vente->user->name ?? 'Utilisateur inconnu'
        ];
    }
}
