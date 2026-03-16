import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private API = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getLaptops() {
    return this.http.get(`${this.API}/laptops`);
  }

  getProductDetails(id: any) {
    return this.http.get(`${this.API}/details/${id}`);
  }

  getAllProducts(){
return this.http.get(`${this.API}/all`);
}

deleteProduct(id:number){
return this.http.delete(`${this.API}/delete/${id}`);
}

addProduct(product:any){
return this.http.post(`${this.API}/add`,product);
}

updateProduct(id:any,data:any){
return this.http.put(`${this.API}/update/${id}`,data);
}

getProduct(id:any){
return this.http.get(`${this.API}/${id}`);
}

}

