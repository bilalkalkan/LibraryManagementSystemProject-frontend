import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(key: any, value: string) {
    return localStorage.setItem(key, value);
  }

  getLocalStorage(key: any) {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: any) {
    return localStorage.removeItem(key);
  }

  getIdDecodeToken() {
    let token = this.getLocalStorage('token') || '{}';
    let id: number = Number(Object.values(jwtDecode(token))[0]);
    return id;
  }

  getUserNameDecodeToken() {
    let token = this.getLocalStorage('token') || '{}';
    let name: string = String(Object.values(jwtDecode(token))[2]);
    return name;
  }
}
