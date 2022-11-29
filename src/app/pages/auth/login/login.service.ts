import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Config } from 'src/app/utility/config';


@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient, private config : Config) {}

  

  login(data): Observable<any> {
    const url =
    this.config.APIUrl + "Account/login";
    //console.log("url=>> ", url)
    return this.http
      .post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
    

}
