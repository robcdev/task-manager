import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
  PaginatedResponse,
  PaginationQuery,
  ApiResponse,
  toISOString,
} from '@task-manager/shared';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<CategoryDto>> {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return {
      data: this.mapToDto(savedCategory),
      message: 'Category created successfully',
    };
  }

  async findAll(
    paginationQuery: PaginationQuery,
  ): Promise<PaginatedResponse<CategoryDto>> {
    const page = paginationQuery.page || 1;
    const limit = paginationQuery.limit || 25;
    const skip = (page - 1) * limit;

    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: ['creator'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: categories.map((category) => this.mapToDto(category)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<ApiResponse<CategoryDto>> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['creator'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return {
      data: this.mapToDto(category),
    };
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<CategoryDto>> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    Object.assign(category, updateCategoryDto);
    const updatedCategory = await this.categoryRepository.save(category);
    return {
      data: this.mapToDto(updatedCategory),
      message: 'Category updated successfully',
    };
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    await this.categoryRepository.remove(category);
    return {
      data: null,
      message: 'Category deleted successfully',
    };
  }

  private mapToDto(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdBy: category.createdBy,
      createdAt: toISOString(category.createdAt),
      updatedAt: toISOString(category.updatedAt),
    };
  }
}
