import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class MyfirmService {

  constructor(private http: HttpClient, private config: Config) { }
  getFirmList(): Observable<any> {
    const url = this.config.APIUrl + "/Myfirm/GetClientList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  FirmAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Myfirm/ClientSaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetFirmById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetClientsById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteFirm(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/DeleteById" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getBankList(): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetBankList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  BankAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Myfirm/BankSaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetBankById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetBankById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteBank(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/DeleteBankById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getPartnerList(): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetPatnerList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  PartnerAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Myfirm/PartnerSaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetPartnerById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetPatnerById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeletePatner(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/DeletePartnerById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
