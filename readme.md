# Quixote
[![Codeship Status for alpineio/quixote](https://img.shields.io/codeship/e1da8dd0-a856-0133-6083-4ae619b9c646.svg)](https://codeship.com/projects/130619)
[![devDependency Status](https://img.shields.io/david/dev/alpineio/quixote.svg)](https://david-dm.org/alpineio/quixote#info=devDependencies)
[![Packagist Version](https://img.shields.io/packagist/v/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)
[![Packagist Downloads](https://img.shields.io/packagist/dt/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)
[![Packagist Pre Release](https://img.shields.io/packagist/vpre/alpineio/quixote.svg)](https://packagist.org/packages/alpineio/quixote)


## Setup new theme

1. `composer create-project alpineio/quixote theme-name` creates a new copy of the Quixote composer project with base boilerplate.
2. `cd theme-name`
3. `vendor/bin/rocinante theme:regen "Super Awesome Theme" ./` renames Alpine.IO's base [Underscores](https://github.com/alpineio/underscores) theme in the current directory.

## Compiling CSS and JavaScript

Bootstrap uses [Grunt](http://gruntjs.com/) with convenient methods for working with the framework. It's how we compile our code, run tests, and more. To use it, install the required dependencies as directed and then run some Grunt commands.

### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Navigate to the root, then run `npm install`. npm will look at [package.json](https://github.com/alpineio/quixote/blob/master/package.json) and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.


### Available Grunt commands

#### Build - `grunt`
Run `grunt` to compile static assets and local web server for theme preview. CSS, Images and JavaScript compile into `/assets`. **Uses [Sass](http://sass-lang.com) and [UglifyJS](http://lisperator.net/uglifyjs/).**

#### Only compile CSS and JavaScript - `grunt assets`
`grunt assets` creates the `/assets` directory with compiled files. **Uses [Sass](http://sass-lang.com/) and [UglifyJS](http://lisperator.net/uglifyjs/).**

#### Only compile CSS - `grunt styles`
`grunt styles` creates the `/assets/css` directory with compiled css. **Uses [Sass](http://sass-lang.com/) and [Autoprefixer](https://github.com/postcss/autoprefixer).**

#### Only compile JavaScript - `grunt scripts`
`grunt scripts` creates the `/assets/js` directory with compiled javascript. **Uses [UglifyJS](http://lisperator.net/uglifyjs/).**

#### Only compile Image - `grunt images`
`grunt images` creates the `/assets/images` directory with compiled images. **Uses [Imagemin](https://github.com/imagemin/imagemin).**

#### Watch - `grunt watch`
This is a convenience method for watching images, javascript, sass and font files, automatically building them whenever you save.


### Docker Components
Quixote ships with a few docker containers to help preview and test your theme

To start docker run the below docker command

* Start docker `docker-compose up`

#### Local Docker

 You may install a local Docker machine from something like: https://www.docker.com/products/docker-toolbox

#### WordPress

http://192.168.99.100:3001/

#### phpMyAdmin

http://192.168.99.100:3100/
username: root
password: secret
