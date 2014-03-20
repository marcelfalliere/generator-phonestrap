# generator-phonestrap [![Build Status](https://secure.travis-ci.org/marcelfalliere/generator-phonestrap.png?branch=master)](https://travis-ci.org/marcelfalliere/generator-phonestrap)


===

# Getting Started

## Dependencies

Make sure you have [yo](https://github.com/yeoman/yo) installed:

    sudo npm install -g yo

And also [cordova](http://docs.phonegap.com/en/3.3.0/guide_cli_index.md.html#The%20Command-Line%20Interface) command line:

	sudo npm install -g cordova

## Using the generator

	npm install generator-phonestrap
	mkdir <myproject> && cd $_
	yo phonestrap

Answer yo's questions ... You will get the following technology stack :

- [jquery](http://api.jquery.com/)
- [backbone](backbonejs.org) (+ [underscore](underscorejs.org))
- [backbone.marionette](marionettejs.com)
- jquery-[hammerjs](eightmedia.github.io/hammer.js/)

From there, you could emulate let's say android :

	grunt less
	cordova platform add android
	cordova emulate android

![Android emulator with phonestrap on](http://i.imgur.com/HzPCIFi.png)


## Next features

- task to add a button
- task to add a page
- p2r view

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


> [Yeoman](http://yeoman.io) generator
