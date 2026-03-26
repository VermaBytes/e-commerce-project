import { Component } from '@angular/core';
import { OrderService } from '../../Orders-page/order.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-component',
  imports: [CommonModule],
  templateUrl: './order-component.html',
  styleUrl: './order-component.css',
})
export class OrderComponent {
  orders: any[] = [];
selectedItems: any[] = [];

constructor(private orderService: OrderService) {} // 🔥 inject
viewDetails(orderId: number) {

  this.orderService.getOrderDetails(orderId)
    .subscribe((data: any[]) => {

      this.selectedItems = data;

    });

}
ngOnInit() {

  const userId = Number(localStorage.getItem('userId'));

  console.log('USER ID FRONTEND:', userId); // 🔥 debug

  this.orderService.getUserOrders(userId)
    .subscribe((data: any) => {

      console.log('ORDERS:', data); // 🔥 debug

      this.orders = data;

    });

}
}
