import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;
  totalItems: number = 0;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotals();
  }

  calculateTotals() {
    this.total = 0;
    this.totalItems = 0;

    this.cartItems.forEach(item => {
      this.total += item.price * item.quantity;
      this.totalItems += item.quantity;
    });
  }

  increaseQty(item: any) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
      return;
    }
    this.updateCart();
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotals();
  }

}