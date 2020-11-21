const debug = require('debug');

const AppLogger = debug('Api');

// logger.log('@func() mymsg');
// logger.log('@func() mymsg  [error: %s]' , err.message);
module.exports = extendName => {
  const logger = {};

  // types
  const log = AppLogger.extend(
    `${extendName}:LOG <pid : ${process.pid}> <${process.env.NODE_ENV}>`,
  );
  const warn = AppLogger.extend(
    `${extendName}:WARN <pid : ${process.pid}> <${process.env.NODE_ENV}>`,
  );
  const debug = AppLogger.extend(
    `${extendName}:DEBUG <pid : ${process.pid}> <${process.env.NODE_ENV}>`,
  );
  const error = AppLogger.extend(
    `${extendName}:ERROR <pid : ${process.pid}> <${process.env.NODE_ENV}>`,
  );

  // overriding
  log.log = console.log.bind(console);
  warn.log = console.log.bind(console);
  debug.log = console.log.bind(console);
  error.log = console.error.bind(console);

  // LOG
  logger.log = function(...args) {
    if (process.env.NODE_ENV !== 'test') {
      log(...args);
    }
  };

  // WARN
  logger.warn = function(...args) {
    if (process.env.NODE_ENV !== 'test') {
      warn(...args);
    }
  };

  // DEBUG
  logger.debug = function(...args) {
    if (process.env.NODE_ENV === 'development') {
      debug(...args);
    }
  };

  // ERROR
  logger.error = function(...args) {
    if (process.env.NODE_ENV !== 'test') {
      error(...args);
    }
  };

  return logger;
};
