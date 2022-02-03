import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    console.log(data, 'data from api');
    return this.appService.accumulate(data);
  }
  @Get('/publish-event')
  async publishEvent() {
    console.log('Main app-controller');
    this.appService.publishEvent();
  }
}
