import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/Products-services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private  cdr :ChangeDetectorRef
  ) {}

  isInCart: boolean = false;

ngOnInit() {
  const id = this.route.snapshot.params['id'];

  this.productService.getProductDetails(id).subscribe((data: any) => {
    this.product = data;
    this.cdr.detectChanges();

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    this.isInCart = cart.some((item: any) => item.id === this.product.id);
  });
}

  
  addToCart(product: any) {

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const alreadyExists = cart.find((item: any) => item.id === product.id);

  if (alreadyExists) {
    alert('⚠️ Product already added in cart');
    return;
  }

  product.quantity = 1; // default quantity

  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));

  alert('✅ Product added to cart');
}

buyNow(product: any) {

  // single product store
  localStorage.setItem('buyNowProduct', JSON.stringify({
    ...product,
    quantity: 1
  }));

  // direct checkout
  window.location.href = '/checkout';
}
}
