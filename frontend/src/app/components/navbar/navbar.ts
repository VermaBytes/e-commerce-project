import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from '../../guards/auth-model/auth-model';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AuthModalComponent, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {

  profileMenu = false;
  mobileMenu = false;
  showAuthModal = false;
  userName = '';
  userLetter = '';
  isLoggedIn = false;

  constructor(private router: Router, public cartService: CartService) {}

  // ✅ OPEN MODAL
  openAuthModal() {
    console.log("CLICK WORKING"); 
    //alert("hello user");
    this.showAuthModal = true;
  }

  // ✅ LOGIN SUCCESS HANDLE
  onLoginSuccess(user: any) {
  this.isLoggedIn = true;

  this.userName = user?.name || 'User';
  this.userLetter = this.userName.charAt(0).toUpperCase();

  this.showAuthModal = false;

  // ✅ redirect
  this.router.navigate(['/']);
}

  // ✅ LOGOUT
  logout() {
    localStorage.clear();

    this.isLoggedIn = false;
    this.userName = '';
    this.userLetter = '';
    this.profileMenu = false;
  }

  // UI toggles
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
      this.isLoggedIn = true;

      this.userName = localStorage.getItem('loggedUserName') || 'User';
      this.userLetter = this.userName.charAt(0).toUpperCase();
    }
  }
}