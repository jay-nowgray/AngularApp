import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from '../utility/config';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  constructor(private http: HttpClient, private config: Config) { }
  getCashRegister(year, month): Observable<any> {
    const url = this.config.APIUrl + "CashRegister/GetCashRegister?Login_Key="+ this.config.login_Key
                                          +"&year="+ year +"&month="+ month;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  CashRegisterAddUpdate(data: any): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "CashRegister/CashRegisterCreateUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  CashRegisterGetByID(Id: string | number): Observable<any> {
    //console.log("fromAPi", Id);
    const url =
      this.config.APIUrl +
      "CashRegister/CashRegisterGetByID?Login_Key=" +
        this.config.login_Key +
      "&Id=" +
      Id;

    +this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
 
  Delete(Id): Observable<any> {
    const url = this.config.APIUrl + "CashRegister/delete/?Expense_Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
 
  DropdownListFromLookup(lookup): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type="+lookup+"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
}
