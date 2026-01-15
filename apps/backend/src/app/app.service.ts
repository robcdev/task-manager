import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Retrieves a message from the API
   * @returns { message: string } with the message
   */
  getData(): { message: string } {
    return { message: 'API message' };
  }
}
