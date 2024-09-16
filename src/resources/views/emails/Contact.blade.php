<!DOCTYPE html>
<html>
<head>
    <title>Nuevo contacto</title>
</head>
<body>
    <h1>Nuevo contacto</h1>
    <p>Has recibido un nuevo mensaje de contacto:</p>
    <p><strong>Nombre:</strong> {{ $data['name'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Mensaje:</strong> {{ $data['message'] }}</p>
</body>
</html>