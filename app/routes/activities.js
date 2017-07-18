const express = require('express');
const strava = require('strava-v3');
const cache = require('../shared/cache');

const router = express.Router();

/**
 * @api {get} /api/activities GET /activities
 * @apiName activites
 * @apiGroup activites
 *
 *
 * @apiParam {Number} before seconds since UNIX epoch, result will start with activities whose
 *                    start_date is before this value
 * @apiParam {Number} after seconds since UNIX epoch, result will start with activities whose
                      start_date is after this value, sorted oldest first
 * @apiParam {Number} page
 * @apiParam {Number} per_page
 *
 * @apiDescription returns the activities for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/activities/#get-activities" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 */
router.get('/activities', (req, res, next) => {
  const { before, after, page, per_page } = req.query;

  const listActivities = (cb) => {
    strava.athlete.listActivities({
      access_token: process.env.STRAVA_ACCESS_TOKEN,
      before,
      after,
      page,
      per_page,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  cache.get(req.url, listActivities, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.send(response);
  });
});

/**
 * @api {get} /api/activities/:id GET /activities/:id
 * @apiName activity
 * @apiGroup activites
 *
 * @apiParam {Number} id Required. An activity ID
 *
 * @apiDescription returns a specified activity see <a href="https://strava.github.io/api/v3/activities/#get-details" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 */
router.get('/activities/:id', (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: 'Missing Activity ID' });
  }

  const getActivity = (cb) => {
    strava.activities.get({
      id,
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getActivity, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

/**
 * @api {get} /api/activities/:id/streams/:type GET /activities/:id/streams/:type
 * @apiName activity streams
 * @apiGroup activites
 *
 * @apiParam (url) {Number} id Required. An activity ID,
 * @apiParam (url) {Number} types Optional. A stream type see <a href="https://strava.github.io/api/v3/streams/" alt="Stream Types">Stream Types</a>
 *
 * @apiParam (query_params) {String} resolution=all number of data points in a stream low(100),
                                    medium(1000), high(10000) or all.
 * @apiParam (query_params) {String} series_type see parameters at <a href="https://strava.github.io/api/v3/streams/" alt="Stream Parameters">Stream Parameters</a>
 *
 * @apiDescription returns a specified activity see <a href="https://strava.github.io/api/v3/activities/#get-details" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 */
router.get('/activities/:id/streams/:types', (req, res, next) => {
  const { id, types } = req.params;
  const { resolution, series_type } = req.query;
  if (!id) {
    return res.status(400).send({ message: 'Missing activity id from request' });
  }

  if (!types) {
    return res.status(400).send({ message: 'Missing types from request' });
  }

  const getActivityStream = (cb) => {
    strava.streams.activity({
      id,
      types,
      resolution,
      series_type,
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getActivityStream, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

module.exports = router;
