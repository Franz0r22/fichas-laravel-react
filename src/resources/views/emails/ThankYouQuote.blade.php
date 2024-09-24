<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por tu cotización</title>
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
        }
        .header {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Gracias por tu cotización</h1>
        </div>
        <div class="content">
            <p>Estimado/a {{ $data['name'] }},</p>
            <p>Gracias por solicitar una cotización para el vehículo:</p>
            <p><strong>{{ $data['carBrand'] }} {{ $data['carModel'] }} {{ $data['carVersion'] }} ({{ $data['carYear'] }}) ({{ $data['carPrice'] }})</strong></p>
            <p>Hemos recibido tu solicitud y nos pondremos en contacto contigo a la brevedad posible para proporcionarte más información.</p>
            <p>Si tienes alguna pregunta adicional, no dudes en contactarnos.</p>
            <p>Saludos cordiales,</p>
            <p>El equipo de ventas</p>
        </div>
        <div class="footer">
            <p>Este es un correo automático, por favor no responda a este mensaje.</p>
        </div>
    </div>
</body>
</html>