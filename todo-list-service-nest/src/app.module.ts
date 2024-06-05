import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

const CONNECT_DB_STRING = 'mongodb://localhost:27017/todo_app_nest';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(CONNECT_DB_STRING),
  ],
})
export class AppModule {}
