import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Products-services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-laptops-component',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './laptops-components.html'
})
export class LaptopsComponent implements OnInit {

  products:any[]=[];

  constructor(private productService:ProductService){}

  ngOnInit(){

    this.productService.getLaptops().subscribe((data:any)=>{

      this.products = data;

    });

  }

}