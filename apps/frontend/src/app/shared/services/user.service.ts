import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/user`;

  createUser(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.baseUrl, createUserDto);
  }

  findAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseUrl);
  }

  findUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.baseUrl}/${id}`, updateUserDto);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
