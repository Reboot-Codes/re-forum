/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import chalk from 'chalk';

// eslint-disable-next-line no-shadow
export enum LogLevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal
}

const prefixes = new Map<LogLevels, string>([
  [LogLevels.Debug, 'DEBUG'],
  [LogLevels.Info, 'INFO'],
  [LogLevels.Warn, 'WARN'],
  [LogLevels.Error, 'ERROR']
]);

const noColor: (str: string) => string = (msg) => msg;
const colorFunctions = new Map<LogLevels, (str: string) => string>([
  [LogLevels.Debug, chalk.gray],
  [LogLevels.Info, chalk.cyan],
  [LogLevels.Warn, chalk.yellow],
  [LogLevels.Error, (str: string) => chalk.red(str)]
]);

export function logger({
  logLevel = LogLevels.Info,
  name
}: {
  logLevel?: LogLevels;
  name?: string;
} = {}) {
  function log(level: LogLevels, ...args: any[]) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const logStr = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || 'DEBUG'),
      name ? `${name} >` : '>',
      ...args
    ];

    switch (level) {
      case LogLevels.Debug:
        console.debug(...logStr);
        break;
      case LogLevels.Info:
        console.info(...logStr);
        break;
      case LogLevels.Warn:
        console.warn(...logStr);
        break;
      case LogLevels.Error:
        console.error(...logStr);
        break;
      default:
        console.log(...logStr);
    }
  }

  function setLevel(level: LogLevels) {
    logLevel = level;
  }

  function debug(...args: any[]) {
    log(LogLevels.Debug, ...args);
  }

  function info(...args: any[]) {
    log(LogLevels.Info, ...args);
  }

  function warn(...args: any[]) {
    log(LogLevels.Warn, ...args);
  }

  function error(...args: any[]) {
    log(LogLevels.Error, ...args);
  }

  function fatal(...args: any[]) {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error
  };
}
