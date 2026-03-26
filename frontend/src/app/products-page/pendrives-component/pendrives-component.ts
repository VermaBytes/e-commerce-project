import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/Products-services/product';

@Component({
  selector: 'app-pendrives-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './pendrives-component.html',
  styleUrl: './pendrives-component.css',
})
export class PendrivesComponent {
   products: any[] = [];
          
            constructor(private productService: ProductService) {}
          
            ngOnInit() {
              this.productService.getProductsByCategory('pendrive').subscribe((data: any) => {
                this.products = data;
              });
            }
}
