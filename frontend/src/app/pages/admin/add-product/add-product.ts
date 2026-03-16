import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/Products-services/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
})
export class AddProductComponent {
  productForm: any;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      category: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProduct() {
    console.log('Button Clicked');

    const formData = new FormData();

    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('category', this.productForm.value.category);
    formData.append('image', this.selectedFile);

    this.productService.addProduct(formData).subscribe((res) => {
      alert('Product Added Successfully');
    });
  }
}
