<?php

namespace App\Rules;

use Illuminate\Support\Facades\Http;
use Illuminate\Contracts\Validation\Rule;

class Recaptcha implements Rule
{
    public function passes($attribute, $value)
    {
        $endpoint = config('services.google_recaptcha');
        $response = Http::asForm()->post($endpoint['url'], [
            'secret' => $endpoint['secret_key'],
            'response' => $value,
        ])->json();

        return $response['success'] && $response['score'] > 0.5;
    }

    public function message()
    {
        return 'Algo salió mal. Por favor, contáctanos directamente por teléfono o correo electrónico.';
    }
}