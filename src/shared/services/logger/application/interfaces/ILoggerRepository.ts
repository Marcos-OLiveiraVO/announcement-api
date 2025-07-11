import { LoggerLevelInput } from './loggerRequest';

export abstract class ILoggerRepository {
  abstract debug(data: LoggerLevelInput): void;
  abstract info(data: LoggerLevelInput): void;
  abstract warn(data: LoggerLevelInput): void;
  abstract error(data: LoggerLevelInput): void;
}
