import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../utility/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Identifiers } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http: HttpClient, private config: Config) { }
  getExpenses(year, month): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Expenses/GetExpenses?Login_Key="+ this.config.login_Key
                                          +"&year="+ year +"&month="+ month;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  expensesAddUpdate(data: any): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Expenses/ExpensesCreateUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  ExpensesGetByID(Id: string | number): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Expenses/ExpensesGetByID?Login_Key=" +
        this.config.login_Key +
      "&Id=" +
      Id;

    +this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  upLoadBase64(
    ExpanceId: string,
    CompanyId: string,
    data: { base64image: any; fileExtention: any }
  ): Observable<any> {
    const url =
      this.config.APIUrl +
      "Expenses/ExpensesFileUploadBase64?Login_Key="+ this.config.login_Key +
      "&Expance_Id=" +
      ExpanceId +
      "Company_Id" +
      CompanyId;

    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  Getall(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  Delete(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Expenses/delete/?Expense_Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  DropdownList(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type=AccountHead&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  DropdownListExpenseType(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type=ExpenseType&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  DropdownListFromLookup(lookup): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type="+lookup+"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
}
