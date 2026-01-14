import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
} from '@task-manager/shared';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return this.mapToDto(savedCategory);
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find({
      relations: ['creator'],
      order: {
        createdAt: 'DESC',
      },
    });

    return categories.map((category) => this.mapToDto(category));
  }

  async findOne(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
      relations: ['creator'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return this.mapToDto(category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    Object.assign(category, updateCategoryDto);
    const updatedCategory = await this.categoryRepository.save(category);
    return this.mapToDto(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: id.toString() },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    await this.categoryRepository.remove(category);
  }

  private mapToDto(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdBy: category.createdBy,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
  }
}
