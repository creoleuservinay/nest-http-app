import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      // options: {
      // transport: Transport.TCP,
      //   host: '127.0.0.1',
      //   port: 8877,
      // },
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
  public accumulate(data: number[]) {
    // send<returnType, paramType>(pattern, param)
    return this.client.send<number, number[]>('add', data);
  }

  async publishEvent() {
    console.log('Main app service-event emited');
    this.client.emit('book-created', {
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
  }
}
