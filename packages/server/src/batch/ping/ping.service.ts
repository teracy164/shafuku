import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);
  constructor(private readonly httpService: HttpService) {}

  @Cron('0 */5 * * * *')
  handleCron() {
    console.log('ping');
    // 1分ごとに自サイトにアクセス
    const url = process.env.HOST || `http://localhost:${process.env.PORT || 8080}`;
    this.logger.log(`ping ${url}`);
    this.httpService.get(url);
  }
}
