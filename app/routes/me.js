const express = require('express');
const strava = require('strava-v3');

const cache = require('../shared/cache');

const router = express.Router();

/**
 * @api {get} /api/me GET /me
 * @apiName me
 * @apiGroup me
 *
 * @apiDescription returns the athlete profile for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/athlete/" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 *
 *
 */
router.get('/me', (req, res, next) => {
  const getMe = (cb) => {
    strava.athlete.get({ access_token: process.env.STRAVA_ACCESS_TOKEN }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getMe, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

/**
 * @api {get} /api/me/:id/stats GET /me/:id/stats
 * @apiName me stats
 * @apiGroup me
 *
 * @apiParam {Number} id Required. An activity ID
 *
 * @apiDescription returns the athlete stats for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/athlete/#stats" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 *
 */
router.get('/me/:id/stats', (req, res, next) => {
  const { id } = req.params;

  const getStatsWithId = (cb) => {
    strava.athletes.stats({
      id,
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (err, payload) => {
      if (err) {
        return cb(err);
      }

      return cb(null, payload);
    });
  };

  return cache.get(req.url, getStatsWithId, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});


/**
 * @api {get} /api/me//stats GET /me/:id/stats
 * @apiName me stats
 * @apiGroup me
 *
 * @apiDescription returns the athlete stats for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/athlete/#stats" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 *
 */
router.get('/me/stats', (req, res, next) => {
  const getStatsWithoutId = cb => strava.athlete.get({
    access_token: process.env.STRAVA_ACCESS_TOKEN,
  }, (err, payload) => {
    if (err) {
      return cb(err);
    }

    if (!payload.id) {
      return cb(new Error('No Athlete ID received from Strava'));
    }

    return strava.athletes.stats({
      id: payload.id,
      access_token: process.env.STRAVA_ACCESS_TOKEN,
    }, (statErr, statPayload) => {
      if (statErr) {
        return cb(statErr);
      }

      return cb(null, statPayload);
    });
  });

  return cache.get(req.url, getStatsWithoutId, (err, response) => {
    if (err) {
      return next(err);
    }

    return res.send(response);
  });
});

module.exports = router;
