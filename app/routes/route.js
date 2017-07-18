const express = require('express');
const strava = require('strava-v3');
const cache = require('../shared/cache');

const router = express.Router();

/**
 * @api {get} /api/route/:id GET /route/:id
 * @apiName route
 * @apiGroup routes
 *
 * @apiParam {Number} id Required. A Route ID
 *
 * @apiDescription returns a specified route see <a href="https://strava.github.io/api/v3/routes/#retreive" alt="Strava Athlete API docs" target="_blank">Strava Api Docs - Routes</a>
 */
router.get('/route/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: 'Missing Route ID' });
  }

  const getRoute = (cb) => {
    strava.routes.get({
      id,
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getRoute, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

/**
 * @api {get} /api/route/:id/streams GET /route/:id/streams
 * @apiName route streams
 * @apiGroup routes
 *
 * @apiParam {Number} id Required. A Route ID
 *
 * @apiDescription returns a specified route see <a href="https://strava.github.io/api/v3/streams/#routes" alt="Strava Athlete API docs" target="_blank">Strava Api Docs - Route Streams</a>
 */
router.get('/route/:id/streams', (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: 'Missing Activity ID' });
  }

  const getRouteStreams = (cb) => {
    strava.streams.route({
      id,
      types: 'latlng', // Not necessary but a bug in the strava wrapper
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getRouteStreams, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

module.exports = router;
