import { loggerInput } from '../interfaces/globalInterface';

export function loggerFormatter(data: loggerInput) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level: data.level,
    message: data.message,
    ...data.context,
  });
}
