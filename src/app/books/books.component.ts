import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Loan } from '../loans/models/loanModel';
import { Book } from './models/bookModel';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  form: FormGroup;
  books: Book[];
  book: Book = new Book();
  bookTrue = 'Emanette değil';
  bookFalse = 'Kitap emanette';
  constructor(
    private bookService: BookService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.initForm();
  }
  get f() {
    return this.form.controls;
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
        this.form.controls['name'].setValue(this.book.name);
        this.form.controls['authorName'].setValue(this.book.authorName);
        this.form.controls['publisherName'].setValue(this.book.publisherName);
        this.form.controls['dateOfIssue'].setValue(this.book.dateOfIssue);
        this.form.controls['bookStatus'].setValue(this.book.bookStatus);
      },
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [
        this.book.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      authorName: [
        this.book.authorName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      publisherName: [
        this.book.publisherName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      dateOfIssue: [
        this.book.dateOfIssue,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      ],
      bookStatus: [this.book.bookStatus, Validators.required],
    });
  }

  save() {
    debugger;
    if (this.form.valid) {
      let bookmodel = Object.assign({ id: this.book.id }, this.form.value);
      if (this.book.id > 0) {
        this.bookService.updateBook(bookmodel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.clear();
            this.getBooks();
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
      } else {
        this.bookService.addBook(bookmodel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.clear();
            this.getBooks();
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
      }
    } else {
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
    this.form.reset();
  }
}
