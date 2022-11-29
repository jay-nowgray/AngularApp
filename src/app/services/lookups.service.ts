import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from '../utility/config';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }
  GetByType(type): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  GetBySubType(type): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupSubType?Lookup_SubType=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  getList(): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  AddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Lookups/SaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetById(Id): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupId?Login_Key=" + this.config.login_Key + "&id=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
