import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [ApiModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
