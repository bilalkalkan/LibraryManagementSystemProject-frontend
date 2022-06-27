import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validateLocaleAndSetLanguage } from 'typescript';
import { Student } from './models/studentModel';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  form: FormGroup;
  students: Student[];
  student: Student = new Student();
  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.initForm();
  }
  get f() {
    return this.form.controls;
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
        this.form.controls['firstName'].setValue(this.student.firstName);
        this.form.controls['lastName'].setValue(this.student.lastName);
        this.form.controls['identificationNumber'].setValue(
          this.student.identificationNumber
        );
        this.form.controls['phoneNumber'].setValue(this.student.phoneNumber);
      },
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: [
        this.student.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      lastName: [
        this.student.lastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      identificationNumber: [
        this.student.identificationNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      phoneNumber: [
        this.student.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
    });
  }

  save() {
    debugger;
    if (this.form.valid) {
      let studentModel = Object.assign(
        { id: this.student.id },
        this.form.value
      );
      if (this.student.id > 0) {
        this.studentService.update(studentModel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.clear();
            this.getStudents();
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error);
          },
        });
      } else {
        this.studentService.add(studentModel).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.clear();
            this.getStudents();
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error);
          },
        });
      }
    } else {
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
    this.form.reset();
  }
}
