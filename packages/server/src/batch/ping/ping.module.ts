import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PingService } from './ping.service';

@Module({
  imports: [HttpModule],
  providers: [PingService],
})
export class PingModule {}
