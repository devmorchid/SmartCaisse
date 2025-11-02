<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StockFaibleNotification extends Notification
{
    use Queueable;

    public $produit;

    public function __construct($produit)
    {
        $this->produit = $produit;
    }

    public function via($notifiable)
    {
        // تقدر تبعث عن طريق البريد الإلكتروني أو قاعدة البيانات
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('⚠️ تنبيه: المخزون منخفض')
            ->line("المنتوج '{$this->produit->nom}' قرب يسالي.")
            ->line('الكمية المتبقية: ' . $this->produit->quantite_stock)
            ->action('تفقد المنتوج', url('/'))
            ->line('من فضلك دير الطلب قبل ما يسالي المخزون.');
    }

    public function toArray($notifiable)
    {
        return [
            'produit_id' => $this->produit->id,
            'message' => "المنتوج {$this->produit->nom} عندو مخزون منخفض.",
        ];
    }
}
