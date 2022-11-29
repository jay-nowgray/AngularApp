import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Config } from "src/app/utility/config";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json-patch+json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ResetPasswordService {
  constructor(private http: HttpClient, private config: Config) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}"
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  forgotPwd(data): Observable<any> {
    let postData = {
      email_Address: data
    };
    const url = this.config.APIUrl + "Account/AdminForgotPassword";

    return this.http
      .post(url, postData, httpOptions)
      .pipe(catchError(this.handleError));
  }
  resetPassword(data): Observable<any> {
    const url =
      this.config.APIUrl + "Account/ResetPassword?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
