import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);
  constructor(private readonly httpService: HttpService) {}

  // ※Renderの無料プランでサーバースリープ回避用
  // @Cron('* */3 * * * *')
  // handleCron() {
  //   // 定期的に自サイトにアクセス
  //   const url = process.env.HOST || `http://localhost:${process.env.PORT || 8080}`;
  //   this.logger.log(`ping ${url}`);
  //   this.httpService.get(url);
  // }
}
