import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { Config } from 'src/app/utility/config';
import { ResetPasswordService } from '../../accounts/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userObj: any;
  showModal: boolean;
  message: any;
  user_Id: any;
  code: any;
  resetPwdFrm = new FormGroup({
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    user_Id: new FormControl(0),
    old_Password: new FormControl(""),
    email: new FormControl(""),
  });
  constructor(private router: Router,
    private api: ResetPasswordService,
    private config: Config,
    private route: ActivatedRoute,
  ) { 
    this.user_Id = this.route.snapshot.queryParamMap.get("user_Id");
    this.code = this.route.snapshot.queryParamMap.get("code");

  }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userObj);
    this.resetPwdFrm.patchValue({
      email: this.userObj.userInfo.email,
      password: "",
      confirmPassword: "",
      old_Password: ""
    });
  }
  resetPwd() {
  //  debugger
    if (this.resetPwdFrm.value.password == "" || this.resetPwdFrm.value.password == null || this.resetPwdFrm.value.password == undefined) {
      Swal.fire("Oops...", "Please enter Password!", "error");
    }
    else
      if (this.resetPwdFrm.value.password !== this.resetPwdFrm.value.confirmPassword) {
        Swal.fire("Oops...", "Confirm Password not matched!", "error");
      }
      else {
          this.config.startLoader();
        this.api.resetPassword(this.resetPwdFrm.value).subscribe(res => {
          if (res.status == 1) {
            //this.showModal = true;
            this.message = res.message;
            //console.log("res==> "+res);
            Swal.fire("Success", res.message, "success");
            this.config.stopLoader();
            this.router.navigateByUrl("/login");
          } else {
            this.config.stopLoader();
            Swal.fire("Oops...", res.message, "error");
          }
        });
      }
  }
}
