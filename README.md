# Simple Strava Proxy

A simple Strava proxy with caching enabled for use with a public Strava access token

see [http://labs.strava.com/developers/](http://labs.strava.com/developers/)

Oauth for use with protected routes and private data may be added in future.

## Requirements

* Node 6.x and above.

## Setup

### Install the dependencies

`npm i`

#### Production build

`$ STRAVA_ACCESS_TOKEN=['Your access token here'] node server.js`

#### Development build

`$ STRAVA_ACCESS_TOKEN=['Your access token here'] NODE_ENV=development node server.js`

You should now have the server up and running at https://localhost/8080.

All api endpoints are prefixed with `/api` https://localhost:8080/api.

e.g. https://localhost:8080/api/me to get your profile data.

### Environment Variables

`STRAVA_ACCESS_TOKEN` The access token you received from your Strava application setup

`CACHE_TIMEOUT` The length of time you would like all results from the Strava API to be cached for in milliseconds

`CORS_WHITELIST` The whitespace separated list of domains you wish to whitelist for access to the API

`PORT` The port you would like the API to be available from

#### Docs

To build the Docs run the following in the root directory

```
npm i -g apidoc && npm run docs
```

Docs will now be generated and can be accessed at https://localhost:8080/docs
