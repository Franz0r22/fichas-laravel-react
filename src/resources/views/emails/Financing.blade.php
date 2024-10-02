<!DOCTYPE html>
<html>
<head>
    <title>Nueva solicitud de financiamiento</title>
</head>
<body>
    <h1>Nueva solicitud de financiamiento</h1>
    <p>Has recibido una nueva solicitud de financiamiento:</p>
    <p><strong>Nombre:</strong> {{ $data['name'] }}</p>
    <p><strong>RUT:</strong> {{ $data['rut'] }}</p>
    <p><strong>Teléfono:</strong> {{ $data['phone'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Monto del crédito:</strong> {{ $data['creditAmount'] }}</p>
    <p><strong>Cantidad de cuotas:</strong> {{ $data['installments'] }}</p>
    <p><strong>Marca del vehículo:</strong> {{ $data['vehicleBrand'] }}</p>
    <p><strong>Modelo del vehículo:</strong> {{ $data['vehicleModel'] }}</p>
    <p><strong>Año del vehículo:</strong> {{ $data['vehicleYear'] }}</p>
    <p><strong>Mensaje:</strong> {{ $data['message'] }}</p>
</body>
</html>