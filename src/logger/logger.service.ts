import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

// 日志级别
const winstonLevel = {
  error: 0,
  warn: 1,
  debug: 2,
  info: 3,
  verbose: 4,
  silly: 5,
};

// 格式化为字符串
const myFormat = format.printf(({ result }) => result);

// 日志格式化
const logFormat = format((opt, bool) => {
  const { level, message, context, timestamp } = opt;
  const str = `[${process.env.NODE_ENV}][${timestamp}] context:[${
    context || 'default'
  }] level:[${level}]  message: [${(message as any).stack || message}]`;
  opt.result = bool ? addColors[level](str) : str;
  return opt;
});

// 添加日志在终端输出的颜色
const addColors = {
  debug: (str: string) => `\x1B[34m${str}\x1B[0m`,
  error: (str: string) => `\x1B[31m${str}\x1B[0m`,
  info: (str: string) => `\x1B[32m${str}\x1B[0m`,
  warn: (str: string) => `\x1B[33m${str}\x1B[0m`,
  verbose: (str: string) => `\x1B[30m${str}\x1B[0m`,
  silly: (str: string) => `\x1B[30m${str}\x1B[0m`,
};

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private context?: string; // 日志内容
  private winstonLogger: Logger; // 日志对象
  public setContext(context: string) {
    this.context = context;
  } // 设置日志内容

  constructor() {
    this.winstonLogger = createLogger({
      exitOnError: false, // 如果为false,处理异常不会导致process.exit
      levels: winstonLevel, // 日志优先级的级别
      transports: [
        new transports.Console({
          level: 'info', // 日志级别
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat(true),
            myFormat
          ), // 格式化info消息
        }), // 控制台输出日志
        new transports.DailyRotateFile({
          level: 'error', // 日志级别
          dirname: 'logs/error', // 日志保存的目录
          filename: 'application-error-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
        }), // 文件输出error日志
        new transports.DailyRotateFile({
          level: 'info', // 日志级别
          dirname: 'logs/info', // 日志保存的目录
          filename: 'application-info-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat(false),
            myFormat
          ),
        }), // 文件输出info日志
      ], // 设置info消息的日志输出位置
    });
  }

  log(message: any, context?: string) {
    return this.winstonLogger.info(message, { context: context || this.context });
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, { trace, context: context || this.context });
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, { context: context || this.context });
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, { context: context || this.context });
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, { context: context || this.context });
  }
}
