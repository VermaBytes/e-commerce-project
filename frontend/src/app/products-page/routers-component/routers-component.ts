import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/Products-services/product';

@Component({
  selector: 'app-routers-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './routers-component.html',
})
export class RoutersComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsByCategory('routers').subscribe((data: any) => {
      this.products = data;
    });
  }
}
