import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  ApiResponse,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/user`;

  createUser(createUserDto: CreateUserDto): Observable<ApiResponse<UserDto>> {
    return this.http.post<ApiResponse<UserDto>>(this.baseUrl, createUserDto);
  }

  findAllUsers(): Observable<ApiResponse<UserDto[]>> {
    return this.http.get<ApiResponse<UserDto[]>>(this.baseUrl);
  }

  findUser(id: number): Observable<ApiResponse<UserDto>> {
    return this.http.get<ApiResponse<UserDto>>(`${this.baseUrl}/${id}`);
  }

  updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Observable<ApiResponse<UserDto>> {
    return this.http.patch<ApiResponse<UserDto>>(
      `${this.baseUrl}/${id}`,
      updateUserDto
    );
  }

  deleteUser(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
