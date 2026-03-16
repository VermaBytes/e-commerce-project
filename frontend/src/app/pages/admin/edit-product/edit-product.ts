import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/Products-services/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.html',
})
export class EditProductComponent implements OnInit {
  productForm: any;
  productId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      category: [''],
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];

    this.productService.getProduct(this.productId).subscribe((data: any) => {
      this.productForm.patchValue(data);
    });
  }

  updateProduct() {
    console.log("updated");
    this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
      alert('Product Updated');

      this.router.navigate(['/admin/products']);
    });
  }
}
