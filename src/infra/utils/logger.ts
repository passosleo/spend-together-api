import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] - %m',
      },
    },
    // file: {
    //   type: 'fileSync',
    //   filename: './logs/app.log',
    //   layout: {
    //     type: 'pattern',
    //     pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] - %m',
    //   },
    //   maxLogSize: 10485760, // 10MB
    //   backups: 3,
    // },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
  },
});

export class Logger {
  public static debug(message: any, ...args: any[]) {
    const logger = log4js.getLogger('default');
    logger.level = 'debug';
    logger.debug(message, ...args);
  }

  public static info(message: any, ...args: any[]) {
    const logger = log4js.getLogger('default');
    logger.level = 'info';
    logger.info(message, ...args);
  }

  public static warn(message: any, ...args: any[]) {
    const logger = log4js.getLogger('default');
    logger.level = 'warn';
    logger.warn(message, ...args);
  }

  public static error(message: any, ...args: any[]) {
    const logger = log4js.getLogger('default');
    logger.level = 'error';
    logger.error(message, ...args);
  }

  public static trace(message: any, ...args: any[]) {
    const logger = log4js.getLogger('default');
    logger.level = 'trace';
    logger.trace(message, ...args);
  }
}
