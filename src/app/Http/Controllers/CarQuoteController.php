<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Mail\QuoteMail;
use App\Mail\ThankYouQuoteMail;
use App\Rules\Recaptcha;

class CarQuoteController extends Controller
{
    public function __invoke(Request $request)
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
            'captcha_token' => ['required', new Recaptcha],
        ]);

        $validated['tipo_mail'] = '687';
        $validated['mensaje'] = 'Mensaje de prueba';

        $this->GuardaCorreo($validated);

        // Enviar correo al administrador
        Mail::to('francisco.davila@destacados.cl')->send(new QuoteMail($validated));

        // Enviar correo de agradecimiento al usuario
        Mail::to($validated['email'])->send(new ThankYouQuoteMail($validated));

        return redirect()->back()->with('success', 'Cotización enviada con éxito');
    }

    protected function GuardaCorreo($parametros)
    {
        $url = 'https://apiau4-hq33atf2lq-uc.a.run.app/auto/guardarCorreo';

        try {
            Http::withToken('88022924501')->post($url, $parametros); // Agregar token Bearer
        } catch (\Exception $e) {
            // Manejar excepciones, como problemas de conexión
            Log::error('Excepción al intentar guardar correo:', [
                'mensaje' => $e->getMessage(),
            ]);
        }
    }
}
