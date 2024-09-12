<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización de Vehículo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #888;
        }
        .field {
            margin-bottom: 15px;
        }
        .field strong {
            display: inline-block;
            width: 100px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nueva Solicitud de Cotización</h1>
        </div>
        <div class="content">
            <p>Se ha recibido una nueva solicitud de cotización con los siguientes detalles:</p>
            
            <div class="field">
                <strong>Nombre:</strong> {{ $data['name'] }}
            </div>
            <div class="field">
                <strong>Email:</strong> {{ $data['email'] }}
            </div>
            <div class="field">
                <strong>RUT:</strong> {{ $data['rut'] }}
            </div>
            <div class="field">
                <strong>Mensaje:</strong> 
                @if(!empty($data['message']))
                    {{ $data['message'] }}
                @else
                    <em>No se proporcionó ningún mensaje.</em>
                @endif
            </div>

            <h2>Detalles del Vehículo</h2>
            <div class="field">
                <strong>Marca:</strong> {{ $data['carBrand'] }}
            </div>
            <div class="field">
                <strong>Modelo:</strong> {{ $data['carModel'] }}
            </div>
            <div class="field">
                <strong>Versión:</strong> {{ $data['carVersion'] }}
            </div>
            <div class="field">
                <strong>Kilómetros:</strong> {{ number_format($data['carKilometers'], 0, ',', '.') }} km
            </div>
            <div class="field">
                <strong>Año:</strong> {{ $data['carYear'] }}
            </div>
            <div class="field">
                <strong>Imagen del vehículo:</strong><br>
                <img src="{{ $data['carImage'] }}" alt="Imagen del vehículo" style="max-width: 100%; height: auto;">
            </div>
            <div class="field">
                <strong>URL del vehículo:</strong> <a href="{{ $data['carUrl'] }}">Ver detalles del vehículo</a>
            </div>
        </div>
        <div class="footer">
            <p>Este es un correo automático generado por el sistema de cotizaciones. Por favor, no responda a este mensaje.</p>
        </div>
    </div>
</body>
</html>
