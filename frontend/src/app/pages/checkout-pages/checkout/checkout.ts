import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../Orders-page/order.service'; 

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  cartItems: any[] = [];
  total = 0;

  // User Form
  name = '';
  address = '';
  phone = '';


  constructor(private orderService: OrderService) {}
  ngOnInit() {

  const buyNow = localStorage.getItem('buyNowProduct');

  if (buyNow) {
    // Buy Now case
    this.cartItems = [JSON.parse(buyNow)];
  } else {
    // Normal Cart case
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  this.calculateTotal();
}

calculateTotal() {
  this.total = this.cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
}
placeOrder() {

  if (!this.name || !this.address || !this.phone) {
    alert('Fill all details');
    return;
  }

  const userId = localStorage.getItem('userId');

  console.log('USER ID:', userId); // 🔥 debug

  const orderData = {
    name: this.name,
    address: this.address,
    phone: this.phone,
    items: this.cartItems,
    total: this.total,
    user_id: Number(userId)   // 🔥 VERY IMPORTANT
  };

  console.log('ORDER DATA:', orderData); // 🔥 debug

  this.orderService.placeOrder(orderData)
    .subscribe((res: any) => {

      alert('🎉 Order Placed Successfully');

      localStorage.removeItem('cart');
      localStorage.removeItem('buyNowProduct');

      window.location.href = '/';

    });
}
}

