import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from './models/bookModel';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[];
  book: Book = new Book();
  bookTrue = 'Emanette değil';
  bookFalse = 'Kitap emanette';
  constructor(
    private bookService: BookService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.GetBooks().subscribe({
      next: (response) => {
        this.books = response.data;
        console.log(response.data);
      },
      error: (errorResponse) => {
        console.log(errorResponse.error);
      },
    });
  }

  getById(id) {
    this.bookService.GetBook(id).subscribe({
      next: (response) => {
        this.book = response.data;
      },
    });
  }

  save() {
    debugger;
    if (this.book.id > 0) {
      this.bookService.updateBook(this.book).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          this.book = new Book();
          this.getBooks();
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        },
      });
    } else {
      this.bookService.addBook(this.book).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          this.book = new Book();
          this.getBooks();
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        },
      });
    }
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.getBooks();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      },
    });
  }

  clear() {
    this.book = new Book();
  }
}
