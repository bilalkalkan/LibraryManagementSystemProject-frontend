import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { TokenModel } from 'src/app/Models/tokenModel';
import { User } from 'src/app/Models/userModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.apiUrl + 'auth/';
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(user: User): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.http.post<SingleResponseModel<TokenModel>>(newPath, user);
  }

  logOut() {
    this.localStorage.removeLocalStorage('token');
    this.localStorage.removeLocalStorage('expiration');
  }

  isAuthenticated() {
    let token = this.localStorage.getLocalStorage('token');
    let expiration = this.localStorage.getLocalStorage('expiration');

    if (token != null && expiration != null) {
      let date = new Date(expiration);
      let nowDate = new Date();
      if (date < nowDate) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
}
