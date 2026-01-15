import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  PaginatedResponse,
  PaginationQuery,
  ApiResponse,
  toISOString,
} from '@task-manager/shared';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   *
   * @param {CreateUserDto} createUserDto - user payload
   * @returns {Promise<ApiResponse<UserDto>>} - response with created user
   */
  async create(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return {
      data: this.mapToDto(savedUser),
      message: 'User created successfully',
    };
  }

  /**
   * Get all users.
   *
   * @param {PaginationQuery} paginationQuery - pagination query
   * @returns {Promise<PaginatedResponse<UserDto>>} - paginated response with users
   */
  async findAll(
    paginationQuery: PaginationQuery,
  ): Promise<PaginatedResponse<UserDto>> {
    const page = paginationQuery.page || 1;
    const limit = paginationQuery.limit || 25;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: users.map((user) => this.mapToDto(user)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Find a user by ID.
   *
   * @param {string} id - user ID
   * @returns {Promise<ApiResponse<UserDto>>} - response with user data
   * @throws {NotFoundException} - if user with given ID not found
   */
  async findOne(id: string): Promise<ApiResponse<UserDto>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return {
      data: this.mapToDto(user),
    };
  }

  /**
   * Update a user by ID.
   *
   * @param {string} id - user ID
   * @param {UpdateUserDto} updateUserDto - update user data
   * @returns {Promise<ApiResponse<UserDto>>} - response with user data
   * @throws {NotFoundException} - if user with given ID not found
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserDto>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return {
      data: this.mapToDto(updatedUser),
      message: 'User updated successfully',
    };
  }

  /**
   * Delete a user by ID.
   *
   * @param {string} id - user ID
   * @returns {Promise<ApiResponse<null>>} - response with deletion result
   * @throws {NotFoundException} - if user with given ID not found
   */
  async remove(id: string): Promise<ApiResponse<null>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.userRepository.remove(user);
    return {
      data: null,
      message: 'User deleted successfully',
    };
  }

  /**
   * Maps a User entity to a UserDto.
   *
   * @param {User} user - User entity
   * @returns {UserDto} - UserDto
   */
  private mapToDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: toISOString(user.createdAt),
      updatedAt: toISOString(user.updatedAt),
    };
  }
}
