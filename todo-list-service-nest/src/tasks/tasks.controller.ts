import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body('description') description: string): Promise<Task> {
    return this.tasksService.create(description);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: { description?: string; isCompleted?: boolean },
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto.description, updateTaskDto.isCompleted);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.tasksService.delete(id);
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
