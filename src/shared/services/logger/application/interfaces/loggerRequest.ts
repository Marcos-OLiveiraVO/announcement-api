export interface LoggerLevelInput {
  level?: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
}
