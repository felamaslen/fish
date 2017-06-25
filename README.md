# Fish

## This application is meant to remind me when to feed my fish, change water etc.

### Setup:
* Rename `local.js.example` to `local.js` and modify with the correct values

### Running:
* `npm i` to install dependencies
* `npm start` to run the web server
* The app can then be accessed at `localhost:8080`

Note: you must have `npm` and `nodejs` installed. On Ubuntu and possibly other
systems, there is an issue with `nodejs` being run as `node`, which is fixed by
symlinking `/usr/bin/nodejs` to `/usr/bin/node`.

### Tools used:
* Node.js with express for the web server
* Gulp for building the client app and initiating Express
* React for the client app, with a Flux framework
* Less CSS preprocessor used for stylesheets

### How it works:

The application is separated into a client app, served at `/`, and a server api, served at `/api`.
The client app is written in ES6/React with a Flux framework, and served statically by Express.
An Express web server is initiated by gulp.
Babel is used to transpile ES6 to ES5 code, using webpack.
Gulp processes Less code into CSS stylesheets for the client app.

For use in development, a webpack development server is used for the client app, 
which is then proxied by the Express server (see the gulpfile for details).
