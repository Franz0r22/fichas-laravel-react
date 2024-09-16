<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use App\Mail\ThankYouContact;
use App\Rules\Recaptcha;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;

class ContactController extends Controller
{
    public function showContactForm(Honeypot $honeypot)
    {
        return Inertia::render('Contact', [
            'honeypot' => $honeypot->toArray(),
        ]);
    }

    public function sendContactForm(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'nullable|string',
            'captcha_token' => ['required', new Recaptcha],
        ]);

        // Enviar correo al administrador
        Mail::to('francisco.davila@destacados.cl')->send(new ContactMail($validated));

        // Enviar correo de agradecimiento al usuario
        Mail::to($validated['email'])->send(new ThankYouContact($validated));

        return redirect()->back()->with('success', 'Cotización enviada con éxito');
    }
}