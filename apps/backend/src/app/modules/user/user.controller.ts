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
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  PaginatedResponse,
  ApiResponse,
} from '@task-manager/shared';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  /**
   * Create a new user.
   *
   * @param {CreateUserDto} createUserDto - user payload
   * @returns {Promise<ApiResponse<UserDto>>} - response with created user
   */
  create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  /**
   * Get paginated users.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Promise<PaginatedResponse<UserDto>>} - paginated response with users
   */
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<UserDto>> {
    return this.userService.findAll({ page, limit });
  }

  @Get(':id')
  /**
   * Find a user by ID.
   *
   * @param {string} id - user ID
   * @returns {Promise<ApiResponse<UserDto>>} - response with user data
   */
  findOne(@Param('id') id: string): Promise<ApiResponse<UserDto>> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  /**
   * Update a user by ID.
   *
   * @param {string} id - user ID
   * @param {UpdateUserDto} updateUserDto - update user data
   * @returns {Promise<ApiResponse<UserDto>>} - response with user data
   */
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserDto>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  /**
   * Delete a user by ID.
   *
   * @param {string} id - user ID
   * @returns {Promise<ApiResponse<null>>} - response with deletion result
   */
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.userService.remove(id);
  }
}
