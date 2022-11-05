import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { SearchTaskDto } from './dto/search.dto';
import { TaskAssign } from './entity/task-assign.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private model: typeof Task, @InjectModel(TaskAssign) private modelAssign: typeof TaskAssign) {}

  async findAll(dto: SearchTaskDto) {
    const where: WhereOptions = {};
    if (dto.userId) {
      // いったん、指定のユーザーを含むタスクをピックアップ
      const targets = await this.model.findAll({
        attributes: ['id'],
        where: { '$assigners.id$': dto.userId },
      });
      // 全情報を付与するため、改めて取得
      return this.model.findAll({
        where: {
          id: { [Op.in]: targets.map((task) => task.id) },
        },
      });
    }
    return this.model.findAll({ where });
  }

  addTask(dto: Partial<Task>) {
    return this.model.create(dto);
  }

  async updateTask(id: number, dto: Partial<Task>) {
    const task = await this.model.findOne({ where: { id } });
    if (task) {
      delete dto.id;
      Object.assign(task, dto);
      return task.save();
    }
    throw new BadRequestException();
  }

  async deleteTask(id: number) {
    const task = await this.model.findOne({ where: { id } });
    if (task) {
      task.isDelete = true;
      return task.save();
    }
    throw new BadRequestException();
  }

  async addTaskAssigners(taskId: number, assigners: number[]) {
    const task = await this.model.findOne({ where: { id: taskId } });
    if (task) {
      const data = assigners.map((userId) => ({ taskId, userId }));
      return this.modelAssign.bulkCreate(data);
    }
    throw new BadRequestException();
  }

  async deleteTaskAssigner(taskId: number, assignUserId: number) {
    const task = await this.model.findOne({ where: { id: taskId } });
    if (task) {
      await this.modelAssign.destroy({ where: { taskId, userId: assignUserId } });
      return;
    }
    throw new BadRequestException();
  }
}
