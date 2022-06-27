import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/userModel';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User = new User();
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
    this.initForm();
  }
  get f() {
    return this.form.controls;
  }
  isAuthenticated() {
    this.loginService.isAuthenticated();
  }

  initForm() {
    this.form = this.fb.group({
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  login() {
    debugger;
    if (this.form.valid) {
      let userModel = Object.assign({}, this.form.value);
      this.loginService.login(userModel).subscribe({
        next: (response) => {
          this.localStorage.setLocalStorage('token', response.data.token);
          this.localStorage.setLocalStorage(
            'expiration',
            response.data.expiration
          );
          this.toastrService.success(response.message);
          this.router.navigate(['/']);
          this.reloadCurrentPage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error);
        },
      });
    } else {
    }
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
