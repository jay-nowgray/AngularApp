import { Component, OnInit, ViewChild } from "@angular/core";
import { Config, eRoleType } from "src/app/utility/config";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { OportunityService } from '../../oportunity.service';
import { DateTimeAdapter } from "ng-pick-datetime";


@Component({
  selector: 'app-edit-oportunity',
  templateUrl: './edit-oportunity.component.html',
  styleUrls: ['./edit-oportunity.component.scss']
})
export class EditOportunityComponent implements OnInit {
  OportunityId: any;

  EditForm: FormGroup;
  servityList: any;
  opportunitiesObj: any = [];
  comments: any = [];
  getAllOpportunitiesRequest: any;
  submitted: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userObj: any;
  ForAdmin: boolean;
  ForUser: boolean;
  constructor(
    private fb: FormBuilder,
    private api: OportunityService,
    private config: Config,
    private router: Router,
    private Route: ActivatedRoute,
    private Config :Config,
    dateTimeAdapter: DateTimeAdapter<any>
  ) {
    this.EditForm = this.fb.group(
      {
        opportunities_Id: "",
        name:["", Validators.required],
        status: "",
        email:['', [ Validators.pattern(this.emailPattern)]],
        mobile:["", Validators.required],
        lastCall: "",
        source: ["", Validators.required],
        comment: "",
        created_By: 0,
        created_By_Name: "",
        opportunity_Type: ["", Validators.required],
        reminderDate: "",
        remarks: "",
        queryFor: "",
      }

    );
    this.OportunityId = this.Route.snapshot.paramMap.get("Id");
    dateTimeAdapter.setLocale('en-IN');
  }

  ngOnInit() {
   this.userObj = JSON.parse(localStorage.getItem("userObj"));
   if (this.userObj.userInfo.role_Id == eRoleType.Admin  || this.userObj.userInfo.role_Id == eRoleType.SuperAdmin){
      this.ForAdmin = true;
    } 
    if (this.userObj.userInfo.role_Id == eRoleType.Sales  || this.userObj.userInfo.role_Id == eRoleType.HR){
      this.ForUser = true;
    } 
    this.loadRequestById(this.OportunityId);
    // this.config.IsHRSales();
    // this.config.IsSuperAdmin();
    
    // this.EditForm.patchValue({
    
    //   lastCall: this.config.getCurrentDates(),
     
    // });
    if (this.OportunityId > 0) {
      this.loadRequestById(this.OportunityId);
    }
    this.EditForm.patchValue({
      opportunity_Type: 'Client',
     
    });

  }
  get f() {
    return this.EditForm.controls;
  }
  IsHRSales() {
    if (this.userObj.userInfo.role_Id == eRoleType.Sales  || this.userObj.userInfo.role_Id == eRoleType.HR) {
      this.ForUser = true;
    } 
    else{
      return false;
    }
    
  }
  IsSuperAdmin(){
    if ( this.userObj.userInfo.role_Id ==eRoleType.SuperAdmin || this.userObj.userInfo.role_Id ===eRoleType.Admin) {
      return true;
    } else {
      return false;
    }
}
  async loadRequestById(Id) {
 
    this.config.startLoader();
    this.api.GetOpportunitiesById(Id).subscribe(
      res => {
        this.opportunitiesObj = res;
        this.comments = res.opportunity.comments;
     

        if (res.opportunity !== null) {
          this.EditForm.patchValue({
            opportunities_Id: res.opportunity.opportunities_Id,
            name: res.opportunity.name,
            status: res.opportunity.status,
            lastCall: res.opportunity.lastCall,
            mobile: res.opportunity.mobile,
            email: res.opportunity.email,
            remarks: res.opportunity.remarks,
            queryFor: res.opportunity.queryFor,
            opportunity_Type: res.opportunity.opportunity_Type,
            source: res.opportunity.source,
            comment: '',
            reminderDate: res.opportunity.reminderDate,

          });
        }
        this.loadRequestById(this.OportunityId);
        this.config.stopLoader();
      
      },
      err => {

        throw new Error(err);
      }
    );
  }


  handleError(error: any): void {
    let errorObj = {
      exception: JSON.stringify(error),
      location: "reportIncidentsPage",
      severity: "low",
      deviceType: "Admin"
    };
    //super.handleError(error);
    //this.dashboardApi.exceptionLog(errorObj);
  }
  SaveForm() {
    this.submitted = true;
  
    if (this.EditForm.invalid) {
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
  
    this.config.startLoader();
    if (this.OportunityId > 0) {
        } else {
      this.EditForm.value.opportunities_Id = 0;
     }
    //  if(this.EditForm.value.opportunity_Type = null){
    //      this.EditForm.value.opportunity_Type = 
    //  }
    this.opportunitiesObj = this.EditForm.value;
    this.opportunitiesObj.comments=[{"comment_Id": 0,
    "comment": this.EditForm.value.comment,
    "opportunities_Id":  this.EditForm.value.opportunities_Id}];
     this.opportunitiesObj.lastCall = this.EditForm.value.lastCall == ""? null : this.EditForm.value.lastCall;
     this.opportunitiesObj.reminderDate = this.EditForm.value.reminderDate == ""? null : this.EditForm.value.reminderDate;
     this.opportunitiesObj.remarks = this.EditForm.value.comment ==="" ? this.opportunitiesObj.remarks : this.EditForm.value.comment;
     
    this.api.EditOpportunitiess(this.opportunitiesObj).subscribe(
      res => {
        this.config.stopLoader();
        if (res.status == 1) {
          Swal.fire("Success", res.message, "success");
          if(this.userObj.userInfo.role_Id==12 || this.userObj.userInfo.role_Id==11)
          {
          this.router.navigate(['/bentex/edit-oportunities/']);
          }
          else{
          this.router.navigate(['/crm/oportunities']);
          }
          this.getAllOpportunitiesRequest();
        
          
          this.loadRequestById(this.OportunityId);
        } else {
          Swal.fire("Oppss...", res.message, "error");
        }
        this.loadRequestById(this.OportunityId);
      },
      err => {
        this.config.stopLoader();
        throw new Error(err);
      }
    
    );
    this.loadRequestById(this.OportunityId);
  }
  SaveRedirectForm() {
    this.submitted = true;
  
    if (this.EditForm.invalid) {
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
   
    this.config.startLoader();
    if (this.OportunityId > 0) {
        } else {
      this.EditForm.value.opportunities_Id = 0;
     }
    this.opportunitiesObj = this.EditForm.value;
    this.opportunitiesObj.comments=[{"comment_Id": 0,
    "comment": this.EditForm.value.comment,
    "opportunities_Id":  this.EditForm.value.opportunities_Id}];
     this.opportunitiesObj.lastCall = this.EditForm.value.lastCall == ""? null : this.EditForm.value.lastCall;
     this.opportunitiesObj.reminderDate = this.EditForm.value.reminderDate == ""? null : this.EditForm.value.reminderDate;
     
    this.api.EditOpportunitiess(this.opportunitiesObj).subscribe(
      res => {
        this.config.stopLoader();
        if (res.status == 1) {
          Swal.fire("Success", res.message, "success");
          //console.log(res);
          // this.router.navigate(['/crm/oportunities']);

          this.EditForm.reset();
          if(this.IsHRSales)
          {
            this.router.navigate(['/bentex/edit-oportunity/']);
          }
          else{
          this.router.navigate(['/crm/edit-oportunity/']);
          }
          // this.loadRequestById(this.OportunityId);
        } else {
          Swal.fire("Oppss...", res.message, "error");
        }
      },
      err => {
        this.config.stopLoader();
        throw new Error(err);
      }
    );
  }
}
