import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from "src/app/pages/accounts/reset-password/reset-password.service";
import { Config } from "src/app/utility/config";
import { HeaderserviceService } from 'src/app/_layout/site_header/headerservice.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-site-header-btx",
  templateUrl: "./site-header-btx.component.html",
  styleUrls: ["./site-header-btx.component.scss"]
})
export class SiteHeaderBtxComponent implements OnInit {
  userObj: any;
  ModalOpenprofile: boolean = false;
  profileForm: FormGroup;
  userId: any;
  ModalOpenresetpwd: boolean = false;
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
  //ModalOpen: boolean;

  constructor(private route: ActivatedRoute,
    private api: HeaderserviceService,
    private router: Router,
    private resetapi: ResetPasswordService,
    private config: Config,
    private profileFormBuilder: FormBuilder) {
    this.user_Id = this.route.snapshot.queryParamMap.get("user_Id");
    this.code = this.route.snapshot.queryParamMap.get("code");
    this.profileForm = this.profileFormBuilder.group({
      password: "",
      role_Name: "",
      full_Name: "",
      email: "",
      last_Login: "2020-12-08T06:46:59.445Z",
      created_On: "2020-12-08T06:46:59.445Z",
      profilePath: "",
      workingFor: "",
      app_Id: "",
      address_Line1: "",
      address_Line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      contact_No1: "",
      contact_No2: "",
      website: "",
      comment: "",
      personal_Email: ""
    });
  }

  ngOnInit() {
   // this.userObj = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userObj);
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userObj);
    this.resetPwdFrm.patchValue({
      email: this.userObj.userInfo.email,
      password: "",
      confirmPassword: "",
      old_Password: ""
    });
  }
  pageRefresh() {
    location.reload();
  }
  loadProfile(user_Id) {
    this.ModalOpenprofile = true;
    this.userId = user_Id;
    this.api.GetprofileById(this.userId).subscribe(
      res => {
        this.profileForm.patchValue({
          password: res.profile.password,
          role_Name: res.profile.role_Name,
          full_Name: res.profile.full_Name,
          email: res.profile.email,
          last_Login: res.profile.last_Login,
          created_On: res.profile.created_On,
          profilePath: res.profile.profilePath,
          workingFor: res.profile.workingFor,
          app_Id: res.profile.app_Id,
          address_Line1: res.profile.address_Line1,
          address_Line2: res.profile.address_Line2,
          city: res.profile.city,
          state: res.profile.state,
          country: res.profile.country,
          pincode: res.profile.pincode,
          contact_No1: res.profile.contact_No1,
          contact_No2: res.profile.contact_No2,
          website: res.profile.website,
          comment: res.profile.comment,
          personal_Email: res.profile.personal_Email

        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }
  signOut(){
    localStorage.removeItem("userObj");
   
    localStorage.removeItem("LoginMessage");
    this.router.navigateByUrl("/");
  }
  openResetPwdModel() {
    this.ModalOpenresetpwd = true;
  }

  SubmitResetPwd() {
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
        this.resetapi.resetPassword(this.resetPwdFrm.value).subscribe(res => {
          if (res.status == 1) {
            //this.showModal = true;
            this.message = res.message;
            //console.log("res==> "+res);
            Swal.fire("Success", res.message, "success");
            this.config.stopLoader();
            this.ModalOpenresetpwd = false;
            this.router.navigateByUrl["/login"];

          } else {
            this.config.stopLoader();
            Swal.fire("Oops...", res.message, "error");
          }
        });
      }
  }

  cancel() {
    this.ModalOpenprofile = false;
  }

  cancelresetpwd() {
    this.ModalOpenresetpwd = false;
    this.resetPwdFrm.reset();
  }

}
