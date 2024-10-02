<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\FinancingMail;
use App\Mail\ThankYouFinancing;
use App\Rules\Recaptcha;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;

class FinancingController extends Controller
{
    public function showFinancingForm(Honeypot $honeypot)
    {
        return Inertia::render('Financing', [
            'honeypot' => $honeypot->toArray(),
        ]);
    }

    public function sendFinancingForm(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rut' => 'required|string|max:12|regex:/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/',
            'phone' => 'required|string|max:20|regex:/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/',
            'email' => 'required|email|max:255',
            'creditAmount' => 'required|numeric|min:0',
            'installments' => 'required|numeric|min:0',
            'vehicleBrand' => 'nullable|string|max:255',
            'vehicleModel' => 'nullable|string|max:255',
            'vehicleYear' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'message' => 'nullable|string',
            'captcha_token' => ['required', new Recaptcha],
        ]);

        try {
            // Enviar correo al administrador
            Mail::to('francisco.davila@destacados.cl')->send(new FinancingMail($validated));

            // Enviar correo de agradecimiento al usuario
            Mail::to($validated['email'])->send(new ThankYouFinancing($validated));

            // Redirigir con un mensaje flash
            return redirect()->back()->with('success', 'Cotización enviada con éxito');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error al enviar el correo: ' . $e->getMessage());

            // Redirigir con un mensaje de error
            return redirect()->back()->with('error', 'Hubo un problema al enviar la cotización. Por favor, inténtelo de nuevo más tarde.');
        }
    }
}
