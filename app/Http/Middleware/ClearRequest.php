<?php

namespace App\Http\Middleware;

use Closure;

class ClearRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $input = $request->all();
        
        array_walk_recursive($input, function (&$value) {
            $value = $this->clear($value);
        });

        $request->merge($input);

        
        return $next($request);
    }
    protected function clear($value)
    {
        // Ver data
        // echo '<pre>', var_dump($value), '</pre>';
        
        $palabrasClave = ['AND', 'OR', 'ALTER TABLE', 'AS', 'BETWEEN', 'CREATE DATABASE', 'CREATE TABLE', 'CREATE INDEX', 'CREATE VIEW', 'DELETE', 'GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'DROP DATABASE', 'DROP INDEX', 'DROP TABLE', 'EXISTS', 'GROUP BY', 'HAVING', 'IN', 'INSERT INTO', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'LIKE', 'ORDER BY', 'SELECT', 'SELECT *', 'SELECT DISTINCT', 'SELECT INTO', 'SELECT TOP', 'TRUNCATE TABLE', 'UNION', 'UNION ALL', 'UPDATE', 'WHERE'];

        // Reemplazar palabras clave por cadena vacía solo si están separadas por espacios
        foreach ($palabrasClave as $clave) {
            $value = preg_replace('/(?<=\s|^)' . preg_quote($clave, '/') . '(?=\s|$)/i', '', $value);
        }

        // Eliminar caracteres no deseados, esto solo deja los permitidos aqui listados, si no aparece uno que se necesite hay que agregarlo
        $value = preg_replace('/[^a-zA-Z0-9@,.\-ñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\/ ():_]/', '', $value);

        return $value;
    }
}
