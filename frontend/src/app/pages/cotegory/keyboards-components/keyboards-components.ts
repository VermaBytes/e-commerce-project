import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/Products-services/product';

@Component({
  selector: 'app-keyboards-components',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './keyboards-components.html',
})
export class KeyboardsComponents {
    products: any[] = [];
       
         constructor(private productService: ProductService) {}
       
         ngOnInit() {
           this.productService.getProductsByCategory('keyboard').subscribe((data: any) => {
             this.products = data;
           });
         }
}
