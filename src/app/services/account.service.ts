import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Config } from '../utility/config';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private config: Config) {


  }


  login(data): Observable<any> {
    const url = this.config.APIUrl + 'Account/login';
    var body = {
      Email: data.email, Password: data.password
    }
    return this.http.post(url, JSON.stringify(body), this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  getAssets(): Observable<any> {
    const url = this.config.APIUrl + 'Assets/GetAssets?Login_Key=debug'
    return this.http.post(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  assetsAddUpdate(data:any):Observable<any> {
    const url=this.config.APIUrl + 'Assets/AssetsCreateUpdate?Login_Key=debug'
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));

  }

}
