FROM php:8.2-apache

ENV APP_ENV=APP_ENV

ENV ACCEPT_EULA=Y 

WORKDIR /var/www/html

# Copy build src
COPY --chown=www-data:www-data ./src .

ENV APP_ENV=local
ENV WWWGROUP=1000
ENV WWWUSER=1000
ENV LOG_CHANNEL=stderr
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
ENV DB_CONNECTION=mysql
ENV API_URL='https://servicesdtk2-new-staging.web.app/v1/new/client'
ENV TOKEN_SERVICE='098159d6-c386-4b5e-9fd5-9f6bca7e58e3'
ENV APP_NAME='SG Autos'
ENV MAIL_DRIVER='smtp'
ENV MAIL_HOST='mail.autosusados.cl'
ENV MAIL_PORT='587'
ENV MAIL_FROM_ADDRESS='contactoau@autosusados.cl'
ENV MAIL_USERNAME='MAIL_USERNAME'
ENV MAIL_PASSWORD='wGtPcgz!1Ajx'
ENV MAIL_FROM_NAME='SG Autos'
ENV MAIL_ENCRYPTION='tls'
ENV CLIENT_ID=2
ENV PRICE_RANGE = 1000000
ENV APP_CACHE_TIME=1800


RUN apt-get update \
    && apt-get -y --no-install-recommends install \
    git zip unzip gnupg libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev ca-certificates

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/


RUN docker-php-ext-configure gd --with-freetype --with-jpeg 

RUN docker-php-ext-install -j$(nproc) gd pdo pdo_mysql mysqli zip

RUN  apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=2.4.4

ENV COMPOSER_MEMORY_LIMIT=-1

RUN composer install --optimize-autoloader --no-dev

RUN composer dump-autoload

#RUN php artisan config:cache

#RUN php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"

#RUN php artisan l5-swagger:generate

#RUN php artisan config:cache

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin-
RUN a2enmod rewrite headers






