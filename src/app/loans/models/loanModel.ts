export class Loan {
  id: number;
  studentId: number;
  bookId: number;
  studentFirstName: string;
  studentLastName: string;
  bookName: string;
  loanDate: Date;
  returnDate?: Date;
}
