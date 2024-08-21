FROM php:8.2-apache

ENV ACCEPT_EULA=Y 

# Install common scripts for devcontainer
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive  \
    && apt-get -y install --no-install-recommends curl ca-certificates\
    && bash -c "$(curl -fsSL "https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/common-debian.sh")" \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install required extensions
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        nodejs npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

RUN apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip

RUN docker-php-ext-install pdo pdo_mysql mysqli

# Apache root 
ENV APACHE_DOCUMENT_ROOT /workspaces/fichas-laravel-react/src/public
# Find and replace config 
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

#Install composer 2.0
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=2.4.4

#RUN npm install

# mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin-
RUN a2enmod rewrite headers
# Run artisan
#RUN php artisan key:generate --no-interaction --force  \
    #&& php artisan route:clear

ENTRYPOINT ["docker-php-entrypoint"]
EXPOSE 80
CMD ["apache2-foreground"]



