const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const index = require('./app/routes/index');
const me = require('./app/routes/me');
const activities = require('./app/routes/activities');
const route = require('./app/routes/route');

const app = express();
const port = process.env.PORT || 8080;
const securityOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  requestCert: false,
};

const secureServer = require('https').createServer(securityOptions, app);


// get our request parameters
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Nothing to see here');
});

// API Docs

app.use('/docs', express.static('docs'));


app.use(helmet());
app.use('/api', [
  index,
  me,
  activities,
  route,
]);

// Start the server
secureServer.listen(port);
console.log(`The api is listening at: http://localhost:${port}`); // eslint-disable-line no-console

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// TODO re enable
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(500).send('error', {
      message: err.message,
      error: err.stack,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(500).send('error', {
    message: err.message,
    error: {},
  });
});
