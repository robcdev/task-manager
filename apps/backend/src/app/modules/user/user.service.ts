import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
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

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return {
      data: this.mapToDto(savedUser),
      message: 'User created successfully',
    };
  }

  async findAll(): Promise<ApiResponse<UserDto[]>> {
    const users = await this.userRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: users.map((user) => this.mapToDto(user)),
    };
  }

  async findOne(id: number): Promise<ApiResponse<UserDto>> {
    const user = await this.userRepository.findOne({
      where: { id: id.toString() },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return {
      data: this.mapToDto(user),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserDto>> {
    const user = await this.userRepository.findOne({
      where: { id: id.toString() },
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

  async remove(id: number): Promise<ApiResponse<null>> {
    const user = await this.userRepository.findOne({
      where: { id: id.toString() },
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
