import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../settings/appSettings';
import { Task } from '../interfaces/Task';
import { Observable } from 'rxjs';
import { ResponseTask } from '../interfaces/ResponseTask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private baseUrl = appSettings.apiUrl;

  constructor() { }

  listTasks(): Observable<ResponseTask>{
    return this.http.get<ResponseTask>(`${this.baseUrl}ToDo`)
  }

  deleteTask(idTask: number): Observable<ResponseTask> {
    return this.http.delete<ResponseTask>(`${this.baseUrl}ToDo/${idTask}`)
  }

  createTask(task: any): Observable<ResponseTask> {
    return this.http.post<ResponseTask>(`${this.baseUrl}ToDo`, task)
  }
}