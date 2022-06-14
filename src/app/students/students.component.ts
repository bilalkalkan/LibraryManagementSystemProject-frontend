import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Student } from './models/studentModel';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  student: Student = new Student();
  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        this.students = response.data;
      },
    });
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe({
      next: (response) => {
        this.student = response.data;
      },
    });
  }

  save() {
    if (this.student.id > 0) {
      this.studentService.update(this.student).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          this.student = new Student();
          this.getStudents();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error);
        },
      });
    } else {
      this.studentService.add(this.student).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          this.student = new Student();
          this.getStudents();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error);
        },
      });
    }
  }

  delete(student: Student) {
    this.studentService.delete(student).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.getStudents();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error);
      },
    });
  }
  clear() {
    this.student = new Student();
  }
}
