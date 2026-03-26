import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/Products-services/product';

@Component({
  selector: 'app-mouse-components',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mouse-components.html',
})
export class MouseComponents {
  products: any[] = [];
         
           constructor(private productService: ProductService) {}
         
           ngOnInit() {
             this.productService.getProductsByCategory('mouse').subscribe((data: any) => {
               this.products = data;
             });
           }
}
