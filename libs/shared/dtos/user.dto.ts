export interface UserDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserDto = Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserDto = Partial<CreateUserDto>;
export type UserResponse = Pick<UserDto, 'id' | 'username' | 'email'>;
