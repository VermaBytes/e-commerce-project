import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  sendOtp(email: string) {
    return this.http.post(`${this.api}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.api}/verify-otp`, { email, otp });
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}