import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { TokenModel } from 'src/app/Models/tokenModel';
import { User } from 'src/app/Models/userModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {}

  register(user: User): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register';
    return this.http.post<SingleResponseModel<TokenModel>>(newPath, user);
  }
}
