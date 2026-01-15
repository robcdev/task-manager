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
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
  PaginatedResponse,
  ApiResponse,
} from '@task-manager/shared';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  /**
   * Create a new category.
   *
   * @param {CreateCategoryDto} createCategoryDto - category payload
   * @returns {Promise<ApiResponse<CategoryDto>>} - response with created category
   */
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<CategoryDto>> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  /**
   * Get paginated categories.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Promise<PaginatedResponse<CategoryDto>>} - paginated response with categories
   */
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<CategoryDto>> {
    return this.categoryService.findAll({ page, limit });
  }

  @Get(':id')
  /**
   * Find a category by ID.
   *
   * @param {string} id - category ID
   * @returns {Promise<ApiResponse<CategoryDto>>} - response with category data
   */
  findOne(@Param('id') id: string): Promise<ApiResponse<CategoryDto>> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  /**
   * Update a category by ID.
   *
   * @param {string} id - category ID
   * @param {UpdateCategoryDto} updateCategoryDto - update category data
   * @returns {Promise<ApiResponse<CategoryDto>>} - response with category data
   */
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<CategoryDto>> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  /**
   * Delete a category by ID.
   *
   * @param {string} id - category ID
   * @returns {Promise<ApiResponse<null>>} - response with deletion result
   */
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.categoryService.remove(id);
  }
}
