import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:any[]=[];

  constructor(){

    const data = localStorage.getItem('cart');

    if(data){
      this.cart = JSON.parse(data);
    }

  }

  addToCart(product:any){

    const exist = this.cart.find(p => p.id === product.id);

    if(exist){

      exist.quantity += 1;

    }else{

      product.quantity = 1;
      this.cart.push(product);

    }

    this.saveCart();

  }

  getCart(){

    return this.cart;

  }

  increaseQty(product:any){

    product.quantity++;

    this.saveCart();

  }

  decreaseQty(product:any){

    if(product.quantity > 1){
      product.quantity--;
    }

    this.saveCart();

  }

  removeItem(id:number){

    this.cart = this.cart.filter(p => p.id !== id);

    this.saveCart();

  }

  getTotal(){

    return this.cart.reduce((total,item)=>{

      return total + item.price * item.quantity;

    },0);

  }

  getCount(){

    return this.cart.length;

  }

  saveCart(){

    localStorage.setItem('cart',JSON.stringify(this.cart));

  }

}