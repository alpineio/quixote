# Quixote
[![Codeship Status for alpineio/quixote](https://img.shields.io/codeship/e1da8dd0-a856-0133-6083-4ae619b9c646.svg)](https://codeship.com/projects/130619)
[![devDependency Status](https://img.shields.io/david/dev/alpineio/quixote.svg)](https://david-dm.org/alpineio/quixote#info=devDependencies)
[![Packagist Version](https://img.shields.io/packagist/v/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)
[![Packagist Downloads](https://img.shields.io/packagist/dt/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)
[![Packagist Pre Release](https://img.shields.io/packagist/vpre/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)


## Setup new theme

- composer create-project alpineio/quixote theme-name -s dev
- vendor/bin/rocinante theme:regen "Super Awesome Theme" ./
- npm install
- gulp


### Docker Components
Quixote ships with a few docker containers to help preview and test your theme

To start docker run the below docker command

- Start docker `docker-compose up`

#### WordPress

http://192.168.99.100:3001/

#### phpMyAdmin

http://192.168.99.100:3100/
username: root
password: secret