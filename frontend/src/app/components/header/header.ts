import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  promotionalBanner = {
    text: '🎉 Free Shipping on Orders Above ₹999 | Today Only!',
    bgColor: '#667eea',
    textColor: 'white',
  };
}
