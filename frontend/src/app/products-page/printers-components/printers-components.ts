import { Component } from '@angular/core';
import { ProductService } from '../../services/Products-services/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-printers-components',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './printers-components.html',
})
export class PrintersComponents {
   products: any[] = [];
       
         constructor(private productService: ProductService) {}
       
         ngOnInit() {
           this.productService.getProductsByCategory('printers').subscribe((data: any) => {
             this.products = data;
           });
         }
}
