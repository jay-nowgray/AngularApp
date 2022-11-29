import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Config } from "src/app/utility/config";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private config: Config, private http: HttpClient) { }

  GetAssets(): Observable<any> {
    const url = this.config.APIUrl + "Assets/GetAssets?Login_key=" + this.config.login_Key;
    let data = {
      "login_Key": this.config.login_Key
    };
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  SaveAssets(data): Observable<any> {
    const url = this.config.APIUrl + "Assets/AssetsCreateUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetAssetById(Id): Observable<any> {
    //console.log("byservice...", Id);
    const url = this.config.APIUrl + "Assets/AssetsPostByID?Login_Key=" + this.config.login_Key + "&Id=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteAssets(Id): Observable<any> {
    const url = this.config.APIUrl + "Assets/Delete"+ Id+"?Login_Key="+ this.config.login_Key ;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetEmployee(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  // GetProduct(type): Observable<any> {
  //   const url = this.config.APIUrl + "Lookup?Login_Key=" + this.config.login_Key;
  //   return this.http
  //     .get(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  GetProduct(type): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  
}