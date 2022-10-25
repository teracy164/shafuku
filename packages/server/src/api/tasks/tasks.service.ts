import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskAssign } from './entity/task-assign.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private model: typeof Task, @InjectModel(TaskAssign) private modelAssign: typeof TaskAssign) {}

  findAll() {
    return this.model.findAll();
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
