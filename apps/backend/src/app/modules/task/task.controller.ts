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
  /**
   * Create a new task.
   *
   * @param {CreateTaskDto} createTaskDto - task payload
   * @returns {Promise<ApiResponse<TaskDto>>} - response with created task
   */
  create(@Body() createTaskDto: CreateTaskDto): Promise<ApiResponse<TaskDto>> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  /**
   * Get paginated tasks.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Promise<PaginatedResponse<TaskDto>>} - paginated response with tasks
   */
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<TaskDto>> {
    return this.taskService.findAll({ page, limit });
  }

  @Get(':id')
  /**
   * Find a task by ID.
   *
   * @param {string} id - task ID
   * @returns {Promise<ApiResponse<TaskDto>>} - response with task data
   */
  findOne(@Param('id') id: string): Promise<ApiResponse<TaskDto>> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  /**
   * Update a task by ID.
   *
   * @param {string} id - task ID
   * @param {UpdateTaskDto} updateTaskDto - update task data
   * @returns {Promise<ApiResponse<TaskDto>>} - response with task data
   */
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<TaskDto>> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  /**
   * Delete a task by ID.
   *
   * @param {string} id - task ID
   * @returns {Promise<ApiResponse<null>>} - response with deletion result
   */
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.taskService.remove(id);
  }
}
