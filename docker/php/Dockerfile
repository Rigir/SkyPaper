FROM php:8.1-fpm-alpine

RUN apk update \
    && apk add --update linux-headers \
    && apk add git \
        curl \
        vim \
        wget \
        bash \
        zlib \
        zlib-dev \
        patch \
        icu-dev

# install php dependencies
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install -f xdebug \
    && docker-php-ext-install intl opcache bcmath sockets \
    && docker-php-ext-enable xdebug intl opcache bcmath sockets \
    && rm -rf /var/lib/apt/lists/*

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer selfupdate

# Set timezone
ENV TIMEZONE=Etc/UCT
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone \
    && printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini \
    && "date"

COPY . /var/www/backend
WORKDIR /var/www/backend

CMD composer install && php-fpm -F

EXPOSE 9000
    