import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from '../../guards/auth-model/auth-model';
import { Router,RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AuthModalComponent,RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  profileMenu = false;
  mobileMenu = false;
  isDropdownOpen = false;
  showAuthModal = false;
  userName = '';
  userLetter = '';
  isLoggedIn: any;

  constructor(private router: Router,public cartService:CartService){}

 openAuthModal() {
    if (this.isLoggedIn) {
      this.profileMenu = !this.profileMenu;
    } else {
      this.showAuthModal = true;
    }
  }

  onLoginSuccess(user: any) {
    this.isLoggedIn = true;

    this.userName = user.name;

    this.userLetter = this.userName.charAt(0).toUpperCase();
  }


  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUserName');
    location.reload();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleProfile() {
    this.profileMenu = !this.profileMenu;
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  closeMobileMenu() {
    this.mobileMenu = false;
  }

  ngOnInit() {
    const login = localStorage.getItem('isLoggedIn');

    if (login) {
      this.userName = localStorage.getItem('loggedUserName') || '';

      if (this.userName) {
        this.userLetter = this.userName.charAt(0).toUpperCase();
      }

      this.isLoggedIn = true;
    }
  }
}
