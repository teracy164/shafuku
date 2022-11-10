import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'front/dist'),
    }),
    DatabaseModule,
    ApiModule,
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
