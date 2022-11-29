import { Component, OnInit, ViewChild } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { OportunityService } from 'src/app/pages/crm/oportunity.service';

@Component({
  selector: 'app-edit-job-applicants',
  templateUrl: './edit-job-applicants.component.html',
  styleUrls: ['./edit-job-applicants.component.scss']
})
export class EditJobApplicantsComponent implements OnInit {
  OportunityId: any;

  EditForm: FormGroup;
  servityList: any;
  opportunitiesObj: any =[];
comments: any =[];
  submitted: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(
    private fb: FormBuilder,
    private api: OportunityService,
    private config: Config,
    private router: Router,
    private Route: ActivatedRoute,
  ) {
    this.EditForm = this.fb.group( 
      {
      opportunities_Id: "",
      name: ["", Validators.required],
      status: "",
      email: ['', [ Validators.pattern(this.emailPattern)]],
      mobile: ["", Validators.required],
      lastCall: "",
      source:["", Validators.required],
      comment: "",
      opportunity_Type: "",
      reminderDate :"",
      remarks: "",
      queryFor: "",
     
    }
    
    );
    this.OportunityId = this.Route.snapshot.paramMap.get("Id");
  }

  ngOnInit() {
    if (this.OportunityId > 0) {
      this.loadRequestById(this.OportunityId);
    }
  }

  async loadRequestById(Id) {
    this.config.startLoader();
    this.api.GetOpportunitiesById(Id).subscribe(
      res => {
        this.opportunitiesObj = res;
        this.comments = res.opportunity.comments;
        //console.log("Incident by ID===> ", res);

        if (res.opportunity !== null) {
          this.EditForm.setValue({
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
            comment:'',
            reminderDate:res.opportunity.reminderDate,
            
          });
        }

        this.config.stopLoader();
      },
      err => {
        this.config.stopLoader();
        throw new Error(err);
      }
    );
  }
  get f() {
    return this.EditForm.controls;
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
    //console.log(this.EditForm)
    if (this.EditForm.invalid) {
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
    //console.log(this.EditForm.value);
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
          this.router.navigate(['/hrm/job-applicants/']);
          
          this.loadRequestById(this.OportunityId);
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
  SaveRedirectForm(){

    this.submitted = true;
    //console.log(this.EditForm.value)
    if (this.EditForm.invalid) {
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
    //console.log(this.EditForm.value);
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
          // this.router.navigate(['/hrm/job-applicants/']);
          
          // this.loadRequestById(this.OportunityId);
          this.EditForm.reset();
          this.router.navigate(['/hrm/edit-job-applicants/']);
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
