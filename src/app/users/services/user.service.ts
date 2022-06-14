import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/Models/responseModel';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { User } from 'src/app/Models/userModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.http.get<SingleResponseModel<User>>(newPath);
  }

  userUpdate(userModel: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.http.post<ResponseModel>(newPath, userModel);
  }
}
