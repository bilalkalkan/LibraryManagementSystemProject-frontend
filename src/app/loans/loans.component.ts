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

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  loans: Loan[];
  loan: Loan = new Loan();
  students: Student[];
  books: Book[];
  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private localService: BsLocaleService
  ) {
    defineLocale('tr', trLocale);
    localService.use('tr');
  }

  ngOnInit(): void {
    this.getStudents();
    this.getLoans();
    this.getBooks();
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
    debugger;
    this.loanService.getLoan(id).subscribe({
      next: (response) => {
        this.loan = response.data;
        this.loan.loanDate = new Date(this.loan.loanDate);
        this.loan.returnDate = new Date();
      },
    });
  }
  save() {
    debugger;
    if (this.loan.id > 0) {
      this.loanService.update(this.loan).subscribe({
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
      this.loanService.add(this.loan).subscribe({
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
    this.loan = new Loan();
  }
}
