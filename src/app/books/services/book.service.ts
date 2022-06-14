import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/Models/listResponseModel';
import { ResponseModel } from 'src/app/Models/responseModel';
import { SingleResponseModel } from 'src/app/Models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { Book } from '../models/bookModel';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = environment.apiUrl + 'books/';

  constructor(private http: HttpClient) {}
  GetBooks(): Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + 'getall';
    return this.http.get<ListResponseModel<Book>>(newPath);
  }

  GetBook(id: number): Observable<SingleResponseModel<Book>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.http.get<SingleResponseModel<Book>>(newPath);
  }

  addBook(bookModel: Book): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.http.post<ResponseModel>(newPath, bookModel);
  }

  deleteBook(bookModel: Book): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.http.post<ResponseModel>(newPath, bookModel);
  }

  updateBook(bookModel: Book): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.http.post<ResponseModel>(newPath, bookModel);
  }
}
