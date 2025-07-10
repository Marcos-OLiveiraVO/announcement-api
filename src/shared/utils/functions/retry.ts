import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({ timeout: 5000 });

axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export async function fetchWithRetry(url: string) {
  try {
    const { data } = await client.get(url);
    return data;
  } catch (error) {
    const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data?.message || error.message || 'Unknown error on search data';

    throw new HttpException(`an error occurred while fetching data from ${url}: with message: ${message}`, status);
  }
}
