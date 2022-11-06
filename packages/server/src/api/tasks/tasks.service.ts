import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { SearchTaskDto } from './dto/search.dto';
import { TaskAssign } from './entity/task-assign.entity';
import { TaskStatus } from './entity/task-status.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private model: typeof Task,
    @InjectModel(TaskStatus) private modelStatus: typeof TaskStatus,
    @InjectModel(TaskAssign) private modelAssign: typeof TaskAssign
  ) {}

  async findAll(dto: SearchTaskDto) {
    const where: WhereOptions = {};
    if (dto.keyword) {
      Object.assign(where, { [Op.or]: [{ title: { [Op.like]: `%${dto.keyword}%` } }, { contents: { [Op.like]: `%${dto.keyword}%` } }] });
    }
    if (dto.orderer) {
      Object.assign(where, { orderer: { [Op.like]: `%${dto.orderer}%` } });
    }
    if (dto.userId) {
      // いったん、指定のユーザーを含むタスクをピックアップ
      const targets = await this.model.findAll({
        attributes: ['id'],
        where: Object.assign({ '$assigners.id$': dto.userId }, where),
      });
      // 全情報を付与するため、改めて取得
      return this.model.findAll({
        where: Object.assign(
          {
            id: { [Op.in]: targets.map((task) => task.id) },
          },
          where
        ),
      });
    }
    return this.model.findAll({ where });
  }

  findOne(id: number) {
    return this.model.findOne({ where: { id } });
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

  async updateTaskStatus(taskId: number, status: number) {
    const task = await this.findOne(taskId);
    if (task) {
      return this.modelStatus.create({ taskId, status });
    }
    throw new BadRequestException();
  }
}
