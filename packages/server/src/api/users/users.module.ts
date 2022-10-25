import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { User } from './entity/user.entity';
import { SeedUser } from './entity/user.seed';
import { UsersContoller } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), SeederModule.forFeature([SeedUser])],
  controllers: [UsersContoller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
