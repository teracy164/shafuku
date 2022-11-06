import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, PartialType } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { SearchTaskDto } from './dto/search.dto';
import { UpdateTaskStatusDto } from './dto/update-status.dto';
import { TaskAssign } from './entity/task-assign.entity';
import { TaskStatus } from './entity/task-status.entity';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'tasks' })
export class TasksContoller {
  constructor(private service: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'タスク一覧取得' })
  @ApiResponse({ status: 200, type: [Task] })
  getTasks(@Query() dto: SearchTaskDto) {
    return this.service.findAll(dto);
  }

  @Post()
  @ApiOperation({ summary: 'タスク追加' })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 200, type: Task })
  addTask(@Body() dto: Partial<Task>) {
    return this.service.addTask(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'タスク修正' })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 200, type: Task })
  updateTask(@Param('id') id: number, @Body() dto: Partial<Task>) {
    return this.service.updateTask(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'タスク削除' })
  deleteTask(@Param('id') id: number) {
    return this.service.deleteTask(id);
  }

  @Post(':taskId/assigns')
  @ApiOperation({ summary: 'タスク受領者追加' })
  @ApiBody({ type: [Number] })
  @ApiResponse({ type: [TaskAssign] })
  addTaskAssigner(@Param('taskId') taskId: number, @Body() assigners: number[]) {
    return this.service.addTaskAssigners(taskId, assigners);
  }

  @Delete(':taskId/assigners/:assignUserId')
  @ApiOperation({ summary: 'タスク受領者削除' })
  deleteTaskAssigner(@Param('taskId') taskId: number, @Param('assignUserId') assignUserId: number) {
    return this.service.deleteTaskAssigner(taskId, assignUserId);
  }

  @Patch(':taskId/status')
  @ApiOperation({ summary: 'タスクステータス更新' })
  @ApiBody({ type: UpdateTaskStatusDto })
  @ApiResponse({ type: TaskStatus })
  updateTaskStatus(@Param('taskId') taskId: number, @Body() dto: UpdateTaskStatusDto) {
    console.log('update task status', dto);
    return this.service.updateTaskStatus(taskId, dto.status);
  }
}
