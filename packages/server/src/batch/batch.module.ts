import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [ScheduleModule.forRoot(), PingModule],
})
export class BatchModule {}
