import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'front/dist'),
    }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
