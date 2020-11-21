// Load env vars
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const logger = require('./utils/logger')('Server');
const routers = require('./routes')
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan((tokens, req, res) =>
      [
        `<${process.env.NODE_ENV}>`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ')
    )
  );
}

// routes
app.use(routers);

// Port
const port = process.env.PORT || '3000';

// Listen
const server = app.listen(port, () => 
  logger.log(`App Listen Successfully To Port ${port}`)
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', (ex) => {
  logger.error(`${ex.message}`.red, ex);
  app.use((_req, res) => {
    res.status(500).json({
      success: false,
      msg: '500 Internet Error',
      data: null,
    });
  });

  // eslint-disable-next-line implicit-arrow-linebreak
  server.close(() => process.exit(1));
});
