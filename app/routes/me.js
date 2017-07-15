const express = require('express');
const strava = require('strava-v3');

const router = express.Router();

/**
 * @api {get} /me GET /me
 * @apiName me
 * @apiGroup me
 *
 * @apiDescription returns the athlete profile for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/athlete/" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 *
 *
 */
router.get('/me', (req, res, next) => {
  // res.status(200).send({ response: 'The API is blah' });
  strava.athlete.get({ access_token: process.env.STRAVA_ACCESS_TOKEN }, (err, payload) => {
    if (err) {
      return next(err);
    }

    return res.send(payload);
  });
});

/**
 * @api {get} /me/:id/stats GET /me/:id/stats
 * @apiName me stats
 * @apiGroup me
 *
 * @apiDescription returns the athlete stats for the current authenticated athlete see
 * <a href="https://strava.github.io/api/v3/athlete/#stats" alt="Strava Athlete API docs" target="_blank">Strava Api Docs</a>
 *
 */
router.get('/me/:id/stats', (req, res, next) => {
  const { id } = req.params;

  // If no athlete ID specified then get the currently active athlete and then GET their stats
  if (!id) {
    return strava.athlete.get({ access_token: process.env.STRAVA_ACCESS_TOKEN }, (err, payload) => {
      if (err) {
        return next(err);
      }

      if (!payload.id) {
        return next(new Error('No Athlete ID received from Strava'));
      }

      return strava.athletes.stats({
        id: payload.id,
        access_token: process.env.STRAVA_ACCESS_TOKEN,
      }, (statErr, statPayload) => {
        if (statErr) {
          return next(statErr);
        }

        return res.send(statPayload);
      });
    });
  }

  // If an ID is provided let's just get their stats
  return strava.athletes.stats({
    id,
    access_token: process.env.STRAVA_ACCESS_TOKEN,
  }, (err, payload) => {
    if (err) {
      return next(err);
    }

    return res.send(payload);
  });
});

module.exports = router;
