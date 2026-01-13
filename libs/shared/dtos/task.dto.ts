import { TaskPriority, TaskStatus } from '../constants/task.constants';
import { PaginatedResponse } from '../types/common.types';

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  categoryId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  createdBy: string;
}

export type CreateTaskDto = Omit<TaskDto, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDto = Partial<CreateTaskDto>;
export type TaskResponse = Pick<TaskDto, 'id' | 'title' | 'status'>;
export type PaginatedTaskResponse = PaginatedResponse<TaskDto>;
