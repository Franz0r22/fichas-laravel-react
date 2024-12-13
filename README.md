# Laravel 11 + React + Inertia.js

Este proyecto combina Laravel 11 como backend, React para el frontend e Inertia.js para facilitar la comunicación entre ambos. A continuación, encontrarás una guía para configurar, desarrollar y desplegar el proyecto.

---

## Requisitos previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- **PHP 8.2 o superior**
- **Composer**
- **Node.js 18 o superior**
- **NPM o Yarn**

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/repo.git
   cd repo
   ```

2. Instala las dependencias de PHP:

   ```bash
   composer install
   ```

3. Instala las dependencias de Node.js:

   ```bash
   npm install
   # O usa Yarn si prefieres:
   # yarn install
   ```

4. Copia el archivo de entorno y configura las variables necesarias:

   ```bash
   cp .env.example .env
   ```

5. Genera la clave de la aplicación:

   ```bash
   php artisan key:generate
   ```

7. Compila los assets del frontend:

   ```bash
   npm run dev
   ```

---

## Uso

### Desarrollo local

1. Inicia el servidor de desarrollo de Laravel:

   ```bash
   php artisan serve
   ```

2. En paralelo, compila los assets del frontend:

   ```bash
   npm run dev
   ```

   El proyecto estará disponible en `http://127.0.0.1:8000`.

### Construcción para producción

1. Compila los assets para producción:

   ```bash
   npm run build
   ```

2. Asegúrate de configurar correctamente tu servidor para servir los archivos de Laravel y React (por ejemplo, con Nginx o Apache).

---

## Estructura del proyecto

- `app/`: Contiene el código del backend de Laravel.
- `resources/js/`: Contiene los componentes de React y las vistas de Inertia.js.
- `routes/web.php`: Define las rutas de la aplicación.
- `resources/images/`: Archivos públicos de imágenes para que vite las compile.
- `public/`: Archivos públicos que no son compilados por vite.

---

## Tecnologías usadas

- **Laravel 11**: Framework PHP para el backend.
- **React**: Biblioteca JavaScript para el frontend.
- **Inertia.js**: Herramienta para construir SPA sin necesidad de una API separada.
- **Vite**: Herramienta para el empaquetado y desarrollo del frontend.
- **Bootstrap 5.3**: Framework CSS para estilos rápidos y consistentes.

---

## Scripts disponibles

### Backend

- `php artisan serve`: Inicia el servidor de desarrollo.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo para React.
- `npm run build`: Compila los assets para producción.

---

### Flujo de datos

1. El frontend (React) hace peticiones HTTP al backend (Laravel), que puede procesar datos y hacer solicitudes a otros microservicios según sea necesario.
2. **Inertia.js** sincroniza el estado entre el servidor y el cliente.
3. El backend puede utilizar servicios como **Spatie Honeypot** para la protección contra bots y otros servicios como **Guzzle** para interactuar con APIs externas.

## API

Este proyecto utiliza una API para la gestión de datos y la interacción entre microservicios. Asegúrate de configurar correctamente las URL de la API en el archivo `.env`.

## Dependencias importantes

### Backend (Laravel)

- **Guzzle**: Cliente HTTP para realizar peticiones a otras APIs.
- **Inertia.js**: Permite la integración entre el backend (Laravel) y el frontend (React), proporcionando una experiencia de SPA sin necesidad de un enfoque tradicional.
- **Spatie Honeypot**: Protección contra bots al agregar campos ocultos a los formularios.
- **Tightenco Ziggy**: Permite la generación dinámica de rutas de Laravel, facilitando su uso en el frontend con JavaScript.

### Frontend (React)

- **Vite**: Bundler rápido y eficiente para el desarrollo y la optimización en producción.
- **React**: Biblioteca para construir interfaces de usuario interactivas y dinámicas.
- **Axios**: Cliente HTTP para interactuar con las APIs, facilitando la realización de solicitudes.
- **React Bootstrap**: Componentes pre-estilizados de Bootstrap para React, proporcionando una interfaz de usuario moderna y consistente.
- **Swiper.js**: Librería para crear carruseles de contenido interactivos, ideal para galerías de imágenes o deslizadores.
- **React Floating WhatsApp**: Integración con WhatsApp para la comunicación directa con los usuarios.
- **Leaflet**: Librería para la creación de mapas interactivos, útil para mostrar ubicaciones o puntos de interés en el frontend.
- **React Google reCAPTCHA v3**: Integración de Google reCAPTCHA v3 para proteger formularios y evitar el uso de bots automáticos.

## Licencia

Este proyecto es **propiedad del cliente** y el cliente es el **dueño del código** fuente. Sin embargo, ciertas funcionalidades, como la **gestión de stock de vehículos**, dependen de un servicio de suscripción proporcionado por la agencia.

---

## Autor

Creado por [Agencia Destacados](https://agenciadestacados.cl/).
