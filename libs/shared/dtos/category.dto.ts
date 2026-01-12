import { PaginatedResponse } from '../types/common.types';

export interface CategoryDto {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateCategoryDto = Omit<
  CategoryDto,
  'id' | 'createdAt' | 'updatedAt'
>;
export type UpdateCategoryDto = Partial<CreateCategoryDto>;
export type CategoryResponse = Pick<CategoryDto, 'id' | 'name'>;

export type PaginatedCategoryResponse = PaginatedResponse<CategoryDto>;
