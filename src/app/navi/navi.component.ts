import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userName: string;
  isVerified;
  constructor(
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.IsUserVerified();
  }
  IsUserVerified() {
    if (this.loginService.isAuthenticated()) {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }
  }

  getUserName() {
    this.userName = this.localStorage.getUserNameDecodeToken();
    console.log(this.userName);
  }

  logOut() {
    this.loginService.logOut();
    this.reloadCurrentPage();
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
