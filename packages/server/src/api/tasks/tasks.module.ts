import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { TaskAssign } from './entity/task-assign.entity';
import { TaskStatus } from './entity/task-status.entity';
import { Task } from './entity/task.entity';
import { SeedTask } from './entity/task.seed';
import { TasksContoller } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [SequelizeModule.forFeature([Task, TaskStatus, TaskAssign]) /* SeederModule.forFeature(SeedTask)*/],
  controllers: [TasksContoller],
  providers: [TasksService],
})
export class TasksModule {}
