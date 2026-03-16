import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/Products-services/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';

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
    private cartService: CartService,
    private router: Router,
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product);

    alert('Product added to cart');
  }

  buyNow() {
    this.cartService.addToCart(this.product);

    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProductDetails(id).subscribe((data: any) => {
      this.product = data;
    });
  }
}
