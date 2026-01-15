import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  ApiResponse,
  PaginatedResponse,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/user`;

  createUser(createUserDto: CreateUserDto): Observable<ApiResponse<UserDto>> {
    return this.http.post<ApiResponse<UserDto>>(this.baseUrl, createUserDto);
  }

  findAllUsers(
    page = 1,
    limit = 25
  ): Observable<PaginatedResponse<UserDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<UserDto>>(this.baseUrl, { params });
  }

  findUser(id: string): Observable<ApiResponse<UserDto>> {
    return this.http.get<ApiResponse<UserDto>>(`${this.baseUrl}/${id}`);
  }

  updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Observable<ApiResponse<UserDto>> {
    return this.http.patch<ApiResponse<UserDto>>(
      `${this.baseUrl}/${id}`,
      updateUserDto
    );
  }

  deleteUser(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
