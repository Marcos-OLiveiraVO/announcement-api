import { Injectable } from '@nestjs/common';
import { fetchWithRetry } from '@shared/utils/functions/retry';
import { PHPostsOutput } from '../interfaces/jsonPHRequest';

@Injectable()
export class GetPostsUseCase {
  constructor() {}

  async execute(): Promise<PHPostsOutput> {
    const posts = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');

    return posts.data;
  }
}
