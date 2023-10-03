import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): string {
    return 'success';
  }
  @Get('/favicon.ico')
  getHello(): string {
    return 'success';
  }
}
