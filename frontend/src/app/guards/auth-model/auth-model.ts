import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-model.html',
})
export class AuthModalComponent {
  name = '';
  email = '';
  mobile = '';
  otp = '';

  otpSent = false;
  error = '';

  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<any>();

  constructor(private authService: AuthService) {}

  sendOtp() {
    const data = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
    };

    this.authService.sendOtp(data).subscribe({
      next: (res) => {
        this.otpSent = true;
      },

      error: (err) => {
        this.error = 'Failed to send OTP';
      },
    });
  }

  verifyOtp() {
    const data = {
      mobile: this.mobile,
      otp: this.otp,
    };

    this.authService.verifyOtp(data).subscribe({
      next: (res) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedUserName', this.name);

        this.loginSuccess.emit({ name: this.name });

        this.close.emit();
      },

      error: (err) => {
        this.error = 'Invalid OTP';
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
