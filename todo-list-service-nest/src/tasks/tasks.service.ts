import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(description: string): Promise<Task> {
    const newTask = new this.taskModel({ description });
    return newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async update(id: string, description: string, isCompleted: boolean): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { description, isCompleted }, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
