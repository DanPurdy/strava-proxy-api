# Simple Strava Proxy


## Requirements

* Node 6.x and above

## Setup

### Install the dependencies

`npm i`

#### Production build

`NODE_ENV=production node server.js`

#### Development build

`STRAVA_ACCESS_TOKEN=['Your access token here'] NODE_ENV=development node server.js`

> To keep the server running in the event of an unexpected error etc I recommend installing Nodemon globally `npm i -g nodemon` and then starting the server with `npm i -g nodemon`

You should now have the server up and running at https://localhost/8080
