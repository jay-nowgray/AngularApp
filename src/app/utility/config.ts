import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

export class Config {
  httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type": "text/json"
    })
  };


  APIUrl: string;
  login_Key: string;
  roleId: number;
  memberId: string;
  ForUser: boolean;
  userObj: any;

  constructor(private ngxService: NgxUiLoaderService) {
    //this.resolveLogin_KeyPromise();
    if (
      this.login_Key !== "" &&
      this.login_Key !== "undefined" &&
      this.login_Key !== null
    ) {
    } else {
      this.login_Key =
        JSON.parse(localStorage.getItem("userObj")) !== null
          ? JSON.parse(localStorage.getItem("userObj")).key
          : "";
    }
    this.memberId =
      JSON.parse(localStorage.getItem("userObj")) !== null
        ? JSON.parse(localStorage.getItem("userObj")).member_Id
        : "";
 
 
this.APIUrl = environment.BaseApi;
  }
 

  updateGlobalKey(key) {
    this.login_Key = key;
  }
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}" + error
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
  resolveLogin_KeyPromise() {
    return new Promise(resolve => {
      this.login_Key =
        JSON.parse(localStorage.getItem("userObj")) !== null
          ? JSON.parse(localStorage.getItem("userObj")).key
          : "";
          this.roleId = JSON.parse(localStorage.getItem("userObj")).userInfo.role_Id;
      resolve(this.login_Key);
    });
  }

  startLoader() {
    this.ngxService.start();
  }
  stopLoader() {
    this.ngxService.stopAll();
  }
  showErrorMessage(message) {
    Swal.fire("Oops...", message, "error");
  }
  showSuccessMessage(message) {
    Swal.fire("Success", message, "success");
  }
  getCurrentDate() {
    // 2020-09-18T14:05:05.318Z
    var date = new Date();
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + "T" +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2) + "." +
      ("00" + date.getMilliseconds()).slice(-2) + "Z";
    //console.log(dateStr);
    return dateStr;
  }
   getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  getSunday(d) {
    return new Date(d.setDate(d.getDate() - d.getDay()+6));
    // d = new Date(d);
    // var day = d.getDay(),
    //     diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    // return new Date(d.setDate(diff));
  }
  getCurrentDates() {
    // 2021-01-01T16:29
    var date = new Date();
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + "T" +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) 
    //console.log(dateStr);
    return dateStr;
  }

  getCurrentDateParsed(dt) {
    if (dt == null) {
      return null;
    }
    // 2020-09-18T14:05:05.318Z
    var date = new Date(dt);
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + "T" +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2) + "." +
      ("00" + date.getMilliseconds()).slice(-2) + "Z";
    //console.log(dateStr);
    return dateStr;
  }


}

export enum eRoleType {
  SuperAdmin=0, 
  Admin=1,
  Manager=2,
  Sales=12,
  HR=11
}