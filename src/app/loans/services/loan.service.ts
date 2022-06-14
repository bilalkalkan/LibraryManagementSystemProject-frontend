import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/Models/listResponseModel';
import { ResponseModel } from 'src/app/Models/responseModel';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { Loan } from '../models/loanModel';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private readonly apiUrl = environment.apiUrl + 'Loans/';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<ListResponseModel<Loan>> {
    let newPath = this.apiUrl + 'getall';
    return this.http.get<ListResponseModel<Loan>>(newPath);
  }

  getLoan(id: number): Observable<SingleResponseModel<Loan>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.http.get<SingleResponseModel<Loan>>(newPath);
  }

  add(loanModel: Loan): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.http.post<ResponseModel>(newPath, loanModel);
  }

  delete(loanModel: Loan): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.http.post<ResponseModel>(newPath, loanModel);
  }

  update(loanModel: Loan): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.http.post<ResponseModel>(newPath, loanModel);
  }
}
