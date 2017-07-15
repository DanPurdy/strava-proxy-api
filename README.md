# Simple Strava Proxy


## Requirements

* Node 6.x and above.

## Setup

### Install the dependencies

`npm i`

#### Production build

`$ STRAVA_ACCESS_TOKEN=['Your access token here'] node server.js`

#### Development build

`$ STRAVA_ACCESS_TOKEN=['Your access token here'] NODE_ENV=development node server.js`

> To keep the server running in the event of an unexpected error etc I recommend installing Nodemon globally `npm i -g nodemon` and then starting the server with `npm i -g nodemon`

You should now have the server up and running at https://localhost/8080.

All api endpoints are prefixed with `/api` https://localhost:8080/api.

e.g. https://localhost:8080/api/me to get your profile data.

#### Docs

To build the Docs run the following in the root directory

```
npm i -g apidoc && npm run docs
```

Docs will now be generated and can be accessed at https://localhost:8080/docs
