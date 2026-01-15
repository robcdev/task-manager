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

  /**
   * Create a new user.
   *
   * @param {CreateUserDto} createUserDto - user payload
   * @returns {Observable<ApiResponse<UserDto>>} - response with created user
   */
  createUser(createUserDto: CreateUserDto): Observable<ApiResponse<UserDto>> {
    return this.http.post<ApiResponse<UserDto>>(this.baseUrl, createUserDto);
  }

  /**
   * Fetch paginated users.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Observable<PaginatedResponse<UserDto>>} - paginated response with users
   */
  findAllUsers(
    page = 1,
    limit = 25
  ): Observable<PaginatedResponse<UserDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<UserDto>>(this.baseUrl, { params });
  }

  /**
   * Fetch a single user by id.
   *
   * @param {string} id - user id
   * @returns {Observable<ApiResponse<UserDto>>} - response with user data
   */
  findUser(id: string): Observable<ApiResponse<UserDto>> {
    return this.http.get<ApiResponse<UserDto>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a user by id.
   *
   * @param {string} id - user id
   * @param {UpdateUserDto} updateUserDto - update user data
   * @returns {Observable<ApiResponse<UserDto>>} - response with user data
   */
  updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Observable<ApiResponse<UserDto>> {
    return this.http.patch<ApiResponse<UserDto>>(
      `${this.baseUrl}/${id}`,
      updateUserDto
    );
  }

  /**
   * Delete a user by id.
   *
   * @param {string} id - user id
   * @returns {Observable<ApiResponse<null>>} - response with deletion result
   */
  deleteUser(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
