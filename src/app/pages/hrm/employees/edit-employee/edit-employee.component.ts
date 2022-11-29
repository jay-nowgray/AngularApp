import { Component, OnInit, ViewChild } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { EmployeeService } from '../../employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  EmployeeId: any;

  EditForm: FormGroup;
  servityList: any;
  employeeObj: any = [];
  comments: any = [];
  employee_Attachments: any;
  constructor(
    private fb: FormBuilder,
    private api: EmployeeService,
    private config: Config,
    private router: Router,
    private Route: ActivatedRoute,
  ) {
    this.EditForm = this.fb.group({
      employee_Id: "",
      users: this.fb.group({
        first_Name: "",
        last_Name: "",
        role_Id: 0,
        email: "",
        is_Active: false,
        user_Id: 0
      }),
      contact: this.fb.group({
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
        personal_Email: "",
        address_Id: 0
      }),
      bankInfo: this.fb.group({
        bank_Id: 0,
        bank_Name: "",
        account_No: "",
        ifsc: "",
        swiftCode: "",
        payPal: ""
      }),
      designation: "",
      location: "",
      department: "",
      date_Of_Joining: "",
      dob: "",
      employment_Type: "",
      emp_Code: ""
    });
    this.EmployeeId = this.Route.snapshot.paramMap.get("Id");
  }

  ngOnInit() {
    if (this.EmployeeId > 0) {
      this.loadRequestById(this.EmployeeId);
    }
  }

  async loadRequestById(Id) {
    this.config.startLoader();
    this.api.GetEmployeeById(Id).subscribe(
      res => {
        this.employeeObj = res;
        this.comments = res.employee.comments;
        //console.log("Incident by ID===> ", res);
        var datePipe = new DatePipe("en-US");
        if (res.employee !== null) {
          this.employee_Attachments = res.employee.employee_Attachments;
          this.EditForm.setValue({
            employee_Id: res.employee.employee_Id,
            users: {
              first_Name: res.employee.users == null ? "" : res.employee.users.first_Name,
              last_Name: res.employee.users == null ? "" : res.employee.users.last_Name,
              role_Id: res.employee.users == null ? 0 : res.employee.users.role_Id,
              email: res.employee.users == null ? "" : res.employee.users.email,
              is_Active: res.employee.users == null ? "" : res.employee.users.is_Active,
              user_Id: res.employee.users == null ? "" : res.employee.users.user_Id
            },
            contact: {
              address_Line1: res.employee.contact == null ? "" : res.employee.contact.address_Line1,
              address_Line2: res.employee.contact == null ? "" : res.employee.contact.address_Line2,
              city: res.employee.contact == null ? "" : res.employee.contact.city,
              state: res.employee.contact == null ? "" : res.employee.contact.state,
              country: res.employee.contact == null ? "India" : res.employee.contact.country,
              pincode: res.employee.contact == null ? "" : res.employee.contact.pincode,
              contact_No1: res.employee.contact == null ? "" : res.employee.contact.contact_No1,
              contact_No2: res.employee.contact == null ? "" : res.employee.contact.contact_No2,
              website: res.employee.contact == null ? "" : res.employee.contact.website,
              comment: res.employee.contact == null ? "" : res.employee.contact.comment,
              personal_Email: res.employee.contact == null ? "" : res.employee.contact.personal_Email,
              address_Id: res.employee.contact == null ? 0 : res.employee.contact.address_Id,
            },
            bankInfo: {
              bank_Id: !res.employee.bankInfo || res.employee.bankInfo == null ? 0 : res.employee.bankInfo.bank_Id,
              bank_Name: !res.employee.bankInfo || res.employee.bankInfo == null ? "" : res.employee.bankInfo.bank_Name,
              account_No: !res.employee.bankInfo || res.employee.bankInfo == null ? "" : res.employee.bankInfo.account_No,
              ifsc: !res.employee.bankInfo || res.employee.bankInfo == null ? "" : res.employee.bankInfo.ifsc,
              swiftCode: !res.employee.bankInfo || res.employee.bankInfo == null ? "" : res.employee.bankInfo.swiftCode,
              payPal: !res.employee.bankInfo || res.employee.bankInfo == null ? "" : res.employee.bankInfo.payPal,
            },
            designation: res.employee.designation,
            date_Of_Joining: datePipe.transform(res.employee.date_Of_Joining, 'yyyy-MM-dd'),
            dob: datePipe.transform(res.employee.dob, 'yyyy-MM-dd'),
            location: res.employee.location,
            employment_Type: res.employee.employment_Type,
            department: res.employee.department,
            emp_Code: res.employee.emp_Code,

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

    this.config.startLoader();
    if (this.EmployeeId > 0) {

    } else {

      this.EditForm.value.employee_Id = 0;

    }
    this.employeeObj = this.EditForm.value;
    this.employeeObj.comments = [{
      "comment_Id": 0,
      "comment": this.EditForm.value.comment,
      "role_Id": parseInt(this.EditForm.value.users.role_Id),
      "employee_Id": this.EditForm.value.employee_Id
    }];
    this.EditForm.value.users.role_Id = parseInt(this.EditForm.value.users.role_Id);
    //console.log("Data==>>> ", this.employeeObj);

    this.api.EditEmployees(this.employeeObj).subscribe(
      res => {
        this.config.stopLoader();
        if (res.status == 1) {
          Swal.fire("Success", res.message, "success");
          //console.log(res);
          this.router.navigate(["/hrm/edit-employee/" + res.employee.employee_Id]);

          this.loadRequestById(this.EmployeeId);
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
