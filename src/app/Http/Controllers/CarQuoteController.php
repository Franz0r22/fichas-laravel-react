<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuoteMail;

class CarQuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rut' => 'required',
            'message' => 'required|string',
        ]);

        Mail::to('francisco.davila@destacados.cl')->send(new QuoteMail($validated));

        return redirect()->back()->with('success', 'Cotización enviada con éxito');
    }
}
