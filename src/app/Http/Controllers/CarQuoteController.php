<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuoteMail;
use App\Mail\ThankYouQuoteMail;

class CarQuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rut' => 'required',
            'message' => 'nullable|string',
            'carBrand' => 'required|string',
            'carModel' => 'required|string',
            'carVersion' => 'required|string',
            'carKilometers' => 'required|integer',
            'carYear' => 'required|integer',
            'carImage' => 'required|url',
            'carUrl' => 'required|url',
        ]);

        // Enviar correo al administrador
        Mail::to('francisco.davila@destacados.cl')->send(new QuoteMail($validated));

        // Enviar correo de agradecimiento al usuario
        Mail::to($validated['email'])->send(new ThankYouQuoteMail($validated));

        return redirect()->back()->with('success', 'Cotización enviada con éxito');
    }
}
