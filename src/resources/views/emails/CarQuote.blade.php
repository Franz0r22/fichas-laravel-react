<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización de Vehículo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
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
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Solicitud de Cotización</h1>
        </div>
        <div class="content">
            <p><strong>Nombre:</strong> {{ $data['name'] }}</p>
            <p><strong>Email:</strong> {{ $data['email'] }}</p>
            <p><strong>Mensaje:</strong> {{ $data['message'] }}</p>
        </div>
        <div class="footer">
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
        </div>
    </div>
</body>
</html>
