import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { ProductService } from '../../../services/Products-services/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService,
              private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      this.cdr.detectChanges();
      console.log(data); // Debug
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((p) => p.id !== id);
    });
  }
}
