import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = "http://localhost:5000/api/auth";

  constructor(private http: HttpClient) {}

  // register(data:any):Observable<any>{
  //   return this.http.post(`${this.API}/register`,data);
  // }

  // login(data:any):Observable<any>{
  //   return this.http.post(`${this.API}/login`,data);
  // }

  sendOtp(data:any){
return this.http.post("http://localhost:5000/api/auth/send-otp",data)
}

verifyOtp(data:any){
return this.http.post("http://localhost:5000/api/auth/verify-otp",data)
}

}