import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    ApiModule,
    SequelizeModule.forRoot({
      dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'test',
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
