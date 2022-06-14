import { Component, OnInit } from '@angular/core';
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
  user: User = new User();
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
  }
  isAuthenticated() {
    this.loginService.isAuthenticated();
  }

  login() {
    this.loginService.login(this.user).subscribe({
      next: (response) => {
        this.localStorage.setLocalStorage('token', response.data.token);
        this.localStorage.setLocalStorage(
          'expiration',
          response.data.expiration
        );
        this.toastrService.success(response.message);

        this.router.navigate(['books']);
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error);
      },
    });
  }
  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
