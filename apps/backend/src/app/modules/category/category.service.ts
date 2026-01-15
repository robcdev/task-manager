import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
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

  async findAll(): Promise<ApiResponse<CategoryDto[]>> {
    const categories = await this.categoryRepository.find({
      relations: ['creator'],
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: categories.map((category) => this.mapToDto(category)),
    };
  }

  async findOne(id: number): Promise<ApiResponse<CategoryDto>> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
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
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<CategoryDto>> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
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

  async remove(id: number): Promise<ApiResponse<null>> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
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
