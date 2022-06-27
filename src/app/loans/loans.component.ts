import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../books/models/bookModel';
import { BookService } from '../books/services/book.service';
import { Student } from '../students/models/studentModel';
import { StudentService } from '../students/services/student.service';
import { Loan } from './models/loanModel';
import { LoanService } from './services/loan.service';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  form: FormGroup;
  loans: Loan[];
  loan: Loan = new Loan();
  students: Student[];
  books: Book[];
  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private localService: BsLocaleService,
    private formbuilder: FormBuilder
  ) {
    defineLocale('tr', trLocale);
    localService.use('tr');
  }
  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.getStudents();
    this.getLoans();
    this.getBooks();
    this.initForm();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        this.students = response.data;
      },
    });
  }

  getBooks() {
    this.bookService.GetBooks().subscribe({
      next: (response) => {
        this.books = response.data;
      },
    });
  }
  getLoans() {
    this.loanService.getLoans().subscribe({
      next: (response) => {
        this.loans = response.data;
      },
    });
  }
  getLoan(id: number) {
    this.loanService.getLoan(id).subscribe({
      next: (response) => {
        this.loan = response.data;
        this.loan.loanDate = new Date(this.loan.loanDate);
        this.loan.returnDate = new Date();
        this.form.controls['studentId'].setValue(this.loan.studentId);
        this.form.controls['bookId'].setValue(this.loan.bookId);
        this.form.controls['loanDate'].setValue(this.loan.loanDate);
        this.form.controls['returnDate'].setValue(this.loan.returnDate);
      },
    });
  }

  initForm() {
    this.form = this.formbuilder.group({
      studentId: [this.loan?.studentId, Validators.required],
      bookId: [this.loan?.bookId, Validators.required],
      loanDate: [this.loan?.loanDate, Validators.required],
      returnDate: [this.loan?.returnDate],
    });
  }

  save() {
    if (this.form.valid) {
      let loanModel = Object.assign({ id: this.loan.id }, this.form.value);
      if (this.loan.id > 0) {
        this.loanService.update(loanModel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.loan = new Loan();
            this.getLoans();
          },
          error: (errorResponse) => {
            console.log(errorResponse.error);
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
      } else {
        this.loanService.add(loanModel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.loan = new Loan();
            this.getLoans();
          },
          error: (errorResponse) => {
            console.log(errorResponse.error);
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
      }
    } else {
    }
  }

  delete(loan: Loan) {
    this.loanService.delete(loan).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.getLoans();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      },
    });
  }

  clear() {
    console.log(this.form.value);
    this.form.reset();
  }
}
