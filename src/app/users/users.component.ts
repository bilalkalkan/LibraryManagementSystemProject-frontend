import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/userModel';
import { UserService } from './services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user: User = new User();
  userId: number;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userId = this.localStorage.getIdDecodeToken();
    this.userService.getUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.data;
        console.log(response.data);
      },
    });
  }

  updateUser() {
    this.userService.userUpdate(this.user).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      },
    });
  }
}
