import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskDto,
  PaginatedResponse,
  PaginationQuery,
  ApiResponse,
} from '@task-manager/shared';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ApiResponse<TaskDto>> {
    const task = this.taskRepository.create(createTaskDto);
    const savedTask = await this.taskRepository.save(task);
    return {
      data: this.mapToDto(savedTask),
      message: 'Task created successfully',
    };
  }

  async findAll(
    paginationQuery: PaginationQuery,
  ): Promise<PaginatedResponse<TaskDto>> {
    const page = paginationQuery.page || 1;
    const limit = paginationQuery.limit || 25;
    const skip = (page - 1) * limit;

    const [tasks, total] = await this.taskRepository.findAndCount({
      relations: ['creator', 'assignedUser', 'category'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks.map((task) => this.mapToDto(task)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<ApiResponse<TaskDto>> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['creator', 'assignedUser', 'category'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return {
      data: this.mapToDto(task),
    };
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<TaskDto>> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return {
      data: this.mapToDto(updatedTask),
      message: 'Task updated successfully',
    };
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    await this.taskRepository.remove(task);
    return {
      data: null,
      message: 'Task deleted successfully',
    };
  }

  private mapToDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      categoryId: task.categoryId,
      dueDate: task.dueDate.toISOString(),
      assignedTo: task.assignedTo,
      createdBy: task.createdBy,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
