<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use GuzzleHttp\Client;
use GuzzleHttp\Promise\Utils;


class PokemonController extends Controller
{
    public function index()
    {
        $client = new Client();
        $response = $client->get('https://pokeapi.co/api/v2/pokemon?limit=20');
        
        if ($response->getStatusCode() == 200) {
            $pokemons = json_decode($response->getBody()->getContents(), true)['results'];
            $promises = [];
    
            foreach ($pokemons as $pokemon) {
                $promises[] = $client->getAsync($pokemon['url']);
            }
    
            $responses = Utils::settle($promises)->wait();
    
            $pokemonDetails = [];
            foreach ($responses as $response) {
                if ($response['state'] === 'fulfilled') {
                    $details = json_decode($response['value']->getBody()->getContents(), true);
                    $pokemonDetails[] = [
                        'name' => $details['name'],
                        'image' => $details['sprites']['other']['official-artwork']['front_default'],
                        'type' => $details['types']['0']['type']['name']
                    ];
                }
            }
    
            return Inertia::render('PokemonList', ['pokemons' => $pokemonDetails]);
        } else {
            return Inertia::render('PokemonList', ['error' => 'Failed to fetch data']);
        }
    }
}
