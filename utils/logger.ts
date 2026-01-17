import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private logDir: string;
  private logFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(this.logDir, `test-${timestamp}.log`);
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }

  private writeToFile(message: string): void {
    try {
      fs.appendFileSync(this.logFile, message + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(level, message, ...args);
    
    // Console output with colors
    switch (level) {
      case LogLevel.DEBUG:
        console.log(`\x1b[36m${formattedMessage}\x1b[0m`); // Cyan
        break;
      case LogLevel.INFO:
        console.log(`\x1b[32m${formattedMessage}\x1b[0m`); // Green
        break;
      case LogLevel.WARN:
        console.warn(`\x1b[33m${formattedMessage}\x1b[0m`); // Yellow
        break;
      case LogLevel.ERROR:
        console.error(`\x1b[31m${formattedMessage}\x1b[0m`); // Red
        break;
    }

    // File output
    this.writeToFile(formattedMessage);
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  step(stepNumber: number, description: string): void {
    const message = `STEP ${stepNumber}: ${description}`;
    this.info(message);
  }

  testStart(testName: string): void {
    this.info('='.repeat(80));
    this.info(`TEST STARTED: ${testName}`);
    this.info('='.repeat(80));
  }

  testEnd(testName: string, status: 'PASSED' | 'FAILED'): void {
    this.info('='.repeat(80));
    this.info(`TEST ${status}: ${testName}`);
    this.info('='.repeat(80));
  }
}

export const logger = new Logger();
