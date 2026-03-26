import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private API = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(data: any) {
    return this.http.post(`${this.API}/place`, data);
  }

  getAllOrders() {
  return this.http.get(`${this.API}/all`);
}

getOrderDetails(id: any) {
  return this.http.get<any[]>(`${this.API}/${id}`);
}

updateStatus(id: any) {
  return this.http.put(`${this.API}/status/${id}`, {});
}

updateOrderStatus(id: any, status: string) {
  return this.http.put(`${this.API}/status/${id}`, { status });
}
 // 🟢 USER ORDERS (🔥 NEW ADD)
  getUserOrders(userId: any) {
  return this.http.get(`${this.API}/user/${userId}`);
}
 
getOrderItems(orderId: number) {
  return this.http.get<any[]>(`http://localhost:5000/api/orders/details/${orderId}`);
}

}