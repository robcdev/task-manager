import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskDto,
  PaginatedResponse,
  ApiResponse,
} from '@task-manager/shared';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<ApiResponse<TaskDto>> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<TaskDto>> {
    return this.taskService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<TaskDto>> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<TaskDto>> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.taskService.remove(id);
  }
}
