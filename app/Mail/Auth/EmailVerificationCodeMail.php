<?php

namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailVerificationCodeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $code;
    public string $firstName;
    public $tries = 3;
    public $backoff = [30, 60];

    public function __construct(string $code, string $firstName)
    {
        $this->code = $code;
        $this->firstName = $firstName;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify Your Email - Hirfati',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.users.verify-email-code',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
