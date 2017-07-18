const rush = require('node-rush');

module.exports = rush({
  maxAge: process.env.CACHE_TIMEOUT || 900000, // 15 minute cache
  errTTL: 5000,
});
