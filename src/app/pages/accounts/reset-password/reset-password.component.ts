import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  showModal: boolean;
  message: any;
  user_Id: any;
  code: any;
  resetPwdFrm = new FormGroup({
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    user_Id: new FormControl(0),
    old_Password: new FormControl(""),
    email_Address: new FormControl(""),
  });
  constructor(private router: Router,
    private api: ResetPasswordService,
    private config: Config,
    private route: ActivatedRoute,
  ) { 
    this.user_Id = this.route.snapshot.queryParamMap.get("user_Id");
    this.code = this.route.snapshot.queryParamMap.get("code");

   
    // this.resetPwdFrm = this.fb.group({
    //   password: [""],
    //   confirmPassword: [""],
    //   user_Id: this.user_Id,
    //   old_Password: this.code,
    //   email_Address: [""]
    // });

  }

  ngOnInit() {
    // //console.log("MemberID=> " + this.memberId);
    // //console.log("Code=> " + this.code);
  }
  resetPwd() {
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
