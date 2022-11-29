import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Config } from 'src/app/utility/config';

import { BehaviorSubject } from "rxjs";
let login_Key = "";
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient, private config: Config) { }
  getClientList(): Observable<any> {
    const url = this.config.APIUrl + "Clients/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  ClientAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Clients/SaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
    .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetClientsById(Id): Observable<any> {
    const url = this.config.APIUrl + "Clients/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  getinvoiceinfo(): Observable<any> {
    const url = this.config.APIUrl + "Invoices/GetInvoiceNumber?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  Delete(Id): Observable<any> {
    const url = this.config.APIUrl + "Clients/delete/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

   getClientType(type): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
   }
   GetFirmById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetClientsById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetClientPL(Id, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Clients/GetClientPL?Login_Key=" + this.config.login_Key + "&clientId=" + Id
      + "&startDate=" + startDate + "&endDate=" + endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetClintById(Id): Observable<any> {
    const url = this.config.APIUrl + "Daybook/GetByClientId?ClientId=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http.post(url, Id, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

}
