import { Component } from '@angular/core';
import { CartService } from '../../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
selector:'app-cart',
standalone:true,
imports:[CommonModule,RouterLink],
templateUrl:'./cart.html'
})

export class CartComponent{

cartItems:any[]=[];

constructor(public cartService:CartService){

this.cartItems = cartService.getCart();

}

}