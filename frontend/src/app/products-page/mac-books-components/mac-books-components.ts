import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/Products-services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mac-books-components',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './mac-books-components.html',
})
export class MacBooksComponents {
    products: any[] = [];
    
      constructor(private productService: ProductService) {}
    
      ngOnInit() {
        this.productService.getProductsByCategory('macbooks').subscribe((data: any) => {
          this.products = data;
        });
      }
}
