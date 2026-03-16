import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  cartItems: any[] = [];

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {
    this.cartItems = cartService.getCart();
  }

  placeOrder() {
    localStorage.removeItem('cart');

    alert('Order Placed Successfully');

    this.router.navigate(['/order-success']);
  }
}
