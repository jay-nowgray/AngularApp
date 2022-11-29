import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/app/utility/config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private config: Config, private http: HttpClient) { }
  getInvoicesList(): Observable<any> {
    const url = this.config.APIUrl + "Invoices/GetInvoice?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getFilterInvoices(year, month, clientId): Observable<any> {
    const url = this.config.APIUrl + "Invoices/GetInvoiceFilter?Login_Key=" + this.config.login_Key
      + "&year=" + year + "&month=" + month + "&Client_Id=" + clientId;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  InvoicesAddUpdate(objInvoice): Observable<any> {
    let data = {
      invoice: objInvoice,
      login_Key: this.config.login_Key,
      user_Id: 0
    }
    const url =
      this.config.APIUrl +
      "Invoices/InvoiceCreateUpdate";
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetInvoicesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Invoices/InvoiceGetByID?Login_Key=" + this.config.login_Key + "&Id=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteInvoices(Id): Observable<any> {
    const url = this.config.APIUrl + "Invoices/delete/" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getClientList(): Observable<any> {
    const url = this.config.APIUrl + "Clients/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getCurrency(type): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }


  upLoadBase64(
    ExpanceId: string,
    CompanyId: string,
    data: { base64image: any; fileExtention: any }
  ): Observable<any> {
    const url =
      this.config.APIUrl +
      "Invoices/InvoiceFileUploadBase64?Login_Key="+ this.config.login_Key +
      "&Expance_Id=" +
      ExpanceId +
      "Company_Id" +
      CompanyId;

    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getPendingInvoice(year, month): Observable<any> {
    const url = this.config.APIUrl + "Invoices/GetPendingInvoiceFilter?Login_Key=" + this.config.login_Key
      + "&year=" + year + "&month=" + month;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getPendingInvoiceforUser(startDate, endDate): Observable<any> {
    const url = this.config.APIUrl + "Reports/GetPendingInvoiceFilterCopy?Login_Key=" + this.config.login_Key
      + "&StartDate=" + startDate + "&EndDate=" + endDate;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
