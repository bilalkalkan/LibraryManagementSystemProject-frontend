import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/userModel';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(
    private registerService: RegisterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.registerService.register(this.user).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      },
    });
  }
}
