import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/Models/listResponseModel';
import { ResponseModel } from 'src/app/Models/responseModel';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { Student } from '../models/studentModel';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = environment.apiUrl + 'Students/';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<ListResponseModel<Student>> {
    let newPath = this.apiUrl + 'getall';
    return this.http.get<ListResponseModel<Student>>(newPath);
  }

  getStudent(id: number): Observable<SingleResponseModel<Student>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.http.get<SingleResponseModel<Student>>(newPath);
  }

  add(studentModel: Student): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.http.post<ResponseModel>(newPath, studentModel);
  }

  delete(studentModel: Student): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.http.post<ResponseModel>(newPath, studentModel);
  }

  update(studentModel: Student): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.http.post<ResponseModel>(newPath, studentModel);
  }
}
