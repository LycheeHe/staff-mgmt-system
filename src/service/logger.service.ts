import { Logger, createLogger, transports, format } from 'winston'
import 'winston-daily-rotate-file'
import path from 'path'

export default class LoggerService {
  private logger: Logger
  /**
   * 
   * @param where either is filename or constructor's name
   */
  constructor(where: string) {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss TZD', alias: 'timestamp' }),
        format.printf(info => `${info.timestamp} - [${info.level}] - ${where} - ${info.message}`)
      ),
      transports: [
        new transports.Console({ format: format.colorize({ all: true }) }),
        new transports.DailyRotateFile({
          filename: path.resolve('staff-mgmt-system-logs/staff-mgmt-system-log-%DATE%.log'),
          datePattern: 'YYYYMMDD',
          zippedArchive: false,
          maxSize: '20m',
        })
      ]
    })
  }

  public info(message: string | object) {
    this.logger.info(message)
  }

  public error(message: string | object) {
    this.logger.error(message)
  }

  public warn(message: string | object) {
    this.logger.warn(message)
  }
}