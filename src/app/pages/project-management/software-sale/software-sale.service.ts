import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SoftwareSaleService {

  constructor(private http: HttpClient, private config: Config) { }
 
  getAllSale(): Observable<any> {
   const url =
     this.config.APIUrl + "Sales/GetAll?Login_Key=" + this.config.login_Key;
   return this.http
     .post(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
 
  saveSale(data): Observable<any> {
   const url =
     this.config.APIUrl + "Sales/SaveUpdate?Login_Key=" + this.config.login_Key;
   //console.log("URL " + url);
   return this.http
     .post(url, data, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 }
 GetSaleById(Id): Observable<any> {
  const url = this.config.APIUrl +"Sales/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
  return this.http
  .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
}
DeleteById(Id): Observable<any> {
  const url = this.config.APIUrl + "Sales/delete/" + Id +"?Login_Key=" + this.config.login_Key;
  return this.http
  .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
}
}