<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\QuoteMail;
use App\Mail\ThankYouQuoteMail;
use App\Rules\Recaptcha;
use Illuminate\Support\Facades\Http;

class CarQuoteController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rut' => 'required',
            'phone' => 'required|integer',
            'message' => 'nullable|string',
            'carBrand' => 'required|string',
            'carModel' => 'required|string',
            'carVersion' => 'required|string',
            'carKilometers' => 'required|integer',
            'carPrice' => 'required|integer',
            'carYear' => 'required|integer',
            'carImage' => 'required|url',
            'carUrl' => 'required|url',
            'automotoraMail' => 'required|email',
            'captcha_token' => ['required'],
            'pie' => 'nullable|numeric',
            'creditTerm' => 'nullable|numeric', 
            'marca' => 'nullable|string',
            'modelo' => 'nullable|string',
            'anio' => 'nullable|integer',
            'kilometraje' => 'nullable|integer',
        ]);

        $contactos = $this->getContactos();
        $to = json_decode($contactos->getContent(), true);

        $toDef = $request->all()['automotoraMail'] ?? 'diseno@destacados.cl';

        $this->GuardaCorreo($validated);

        // Enviar correo al administrador
        Mail::to(explode(',', $to['data'] ?? $toDef))->send(new QuoteMail($validated));

        // Enviar correo de agradecimiento al usuario
        Mail::to($validated['email'])->send(new ThankYouQuoteMail($validated));

        return redirect()->back()->with('success', 'Cotización enviada con éxito');
    }

    public function getContactos()
    {
        $apiUrl = config('services.api.urlfichas');
        $apiToken = config('services.api.tokenfichasv2');
        $endpoint = '/diccionario/autos/sucursales/';
        $url = $apiUrl . $endpoint . config('services.api.idClientes');

        $response = Http::withToken($apiToken)->get($url);

        if ($response->successful()) {
            $info = $response->json();
            $lastPosition = count($info) - 1;
            $data = $info[$lastPosition];
            return response()->json([
                'message' => 'Contactos enviados',
                'data' => $data,
            ]);
        } else {
            return response()->json(
                [
                    'message' => 'Error al obtener contactos',
                    'errors' => $response->json(),
                ],
                500,
            );
        }
    }

    protected function GuardaCorreo($lead)
    {
        Log::channel('leads')->info('Lead guardado temporalmente:', [
            'lead' => $lead,
        ]);
    }
}