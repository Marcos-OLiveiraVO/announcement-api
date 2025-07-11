import axios from 'axios';
import axiosRetry from 'axios-retry';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { FetchWithRetryInput } from '../interfaces/globalInterface';

export function axiosWithRetryAndLogger(logger: ILoggerRepository) {
  const client = axios.create({ timeout: 5000 });

  axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error),
    onRetry: (retryCount, error) => {
      const url = error?.config?.url;
      const message = error?.message;

      logger?.warn({
        message: `Retrying request [attempt ${retryCount}] to ${url}`,
        context: {
          attempt: retryCount,
          url: url,
          error: message,
          status: error?.response?.status,
        },
      });
    },
  });

  return client;
}

export async function fetchWithRetry(data: FetchWithRetryInput) {
  const starttime = Date.now();
  const axios = axiosWithRetryAndLogger(data.logger);
  const operation = data.operationName || data.url;

  try {
    data.logger?.info({
      message: `fetching data from ${operation}`,
      context: { url: data.url, operationName: operation },
    });

    const result = await axios.get(data.url);
    const durationMs = Date.now() - starttime;
    const totalItems = Array.isArray(result.data) ? result.data.length : result.data.count;

    data.logger?.info({
      message: `fetched data successfully from ${operation}`,
      context: {
        url: data.url,
        operationName: data.operationName,
        status: result.status,
        count: totalItems,
        durationInMs: durationMs,
      },
    });

    return result.data;
  } catch (error) {
    const duration = Date.now() - starttime;
    const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data?.message || error.message || 'Unknown error on search data';

    data.logger?.error({
      message: `error fetching data from ${operation} after all retries failed`,
      context: {
        url: data.url,
        status,
        operationName: data.operationName,
        error: message,
        durationInMs: duration,
      },
    });

    throw new HttpException({ message: `Error fetching data from ${operation}`, detail: message }, status);
  }
}
