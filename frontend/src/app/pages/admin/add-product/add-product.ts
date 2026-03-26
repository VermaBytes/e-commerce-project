import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
 @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
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

      // ✅ Form reset
      this.productForm.reset();

      // ✅ File clear
      this.selectedFile = null;

       // ✅ File input UI reset
    this.fileInput.nativeElement.value = '';
    });
  }
}
