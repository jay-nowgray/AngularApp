import { Component, OnInit, ErrorHandler, ViewChild } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router } from "@angular/router";
import { OportunityService } from '../oportunity.service';
import Swal from 'sweetalert2';
import { SmsService } from '../sms.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['mobile', 'name', 'status', 'remarks', 'queryFor', 'lastCall', 'reminderDate', 'action'];
  smsForm: FormGroup;
  getAllOpportunities: Array<Object>;
  PageNo: any = 1;
  query: string = "";
  collection = [];
  filteredItems: any;
  userObj: any;
  userId: number;
  p: any;
  Reports: any;
  showMobileNoTextbox: boolean;
  showTypeTextbox: boolean;
  showNameTextbox: boolean;
  showStatusTextbox: boolean;
  showLastCallTextbox: boolean;
  filterData: any = {
    filterByName: false
  }

  getAllOpportunitiesMain: any;
  dataSource: any;
  ForAdmin: boolean;
  ForUser: boolean;
  roleId: any;
  LeadTypeForSearch: any = "";
  LeadStatusForSearch: any = "";
  constructor(private fb: FormBuilder,
    private api: OportunityService,
    private config: Config,
    private messageService: SmsService,
    private router: Router
  ) {

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.smsForm = this.fb.group({
      mobileNumbers: "",
      messageText: "",
      msgType: ""
    })
  }


  ngOnInit() {
    this.getAllOpportunitiesRequest();
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    if (this.userObj.userInfo.user_Id == 0 || this.userObj.userInfo.user_Id == 1) {
      this.ForAdmin = true;
    }
    if (this.userObj.userInfo.user_Id == 10) {
      this.ForUser = true;
    }
    this.roleId = this.userObj.userInfo.role_Id;
  }
  IsSuperAdmin() {
    if (this.roleId === 0) {
      return true;
    } else {
      return false;
    }

  }
  async getAllOpportunitiesRequest() {
    this.config.startLoader();
    this.api
      .GetOpportunitiesClient()
      .subscribe(res => {
        if ((res.status = 1)) {
          this.getAllOpportunitiesMain = res.opportunities;
          this.getAllOpportunities = res.opportunities;
          this.dataSource = new MatTableDataSource(res.opportunities);
          this.dataSource.sort = this.sort;

          this.dataSource.paginator = this.paginator;
          this.config.stopLoader();
        } else {
          this.config.stopLoader();

        }
      });
  }

  EditRequestResponse(Id) {
    this.router.navigate(["crm/edit-leads/" + Id]);
  }
  UserEditRequestResponse(Id) {
    this.router.navigate(["bentex/edit-leads/" + Id]);
  }
  pageChange(newPage: number) {
    this.router.navigate(["/crm/leads"], { queryParams: { page: newPage } });
  }
  UserpageChange(newPage: number) {
    this.router.navigate(["/bentex/leads"], { queryParams: { page: newPage } });
  }
  handleError(error: any): void {
    let errorObj = {
      exception: JSON.stringify(error),
      location: "reportIncidentsPage",
      severity: "low",
      deviceType: "Admin"
    };

  }
  LeadsFilterChange(filterByName) {
    if (filterByName == "None") {
      this.showMobileNoTextbox = false;
      this.showNameTextbox = false;
      this.showTypeTextbox = false;
      this.showStatusTextbox = false;
      this.showLastCallTextbox = false;
      this.getAllOpportunitiesRequest();
    } else if (filterByName == "Mobile") {
      this.showMobileNoTextbox = true;
      this.showNameTextbox = false;
      this.showTypeTextbox = false;
      this.showStatusTextbox = false;
      this.showLastCallTextbox = false;
    }
    else if (filterByName == "Name") {
      this.showMobileNoTextbox = false;
      this.showNameTextbox = true;
      this.showTypeTextbox = false;
      this.showStatusTextbox = false;
      this.showLastCallTextbox = false;
    }
    else if (filterByName == "Type") {
      this.showMobileNoTextbox = false;
      this.showNameTextbox = false;
      this.showTypeTextbox = true;
      this.showStatusTextbox = false;
      this.showLastCallTextbox = false;
    }
    else if (filterByName == "Status") {
      this.showMobileNoTextbox = false;
      this.showNameTextbox = false;
      this.showTypeTextbox = false;
      this.showStatusTextbox = true;
      this.showLastCallTextbox = false;
    }
    else if (filterByName == "LastCall") {
      this.showMobileNoTextbox = false;
      this.showNameTextbox = false;
      this.showTypeTextbox = false;
      this.showStatusTextbox = false;
      this.showLastCallTextbox = true;
    }
  }
  filterByMobileNo(value) {
    if (!value) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.mobile.indexOf(value) > -1
    );
    this.dataSource = new MatTableDataSource(this.filteredItems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filterByName(value) {
    if (!value) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports => Reports.name != null &&
        Reports.name.indexOf(value) > -1
    );
    this.dataSource = new MatTableDataSource(this.filteredItems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filterByType() {
    if (!this.LeadTypeForSearch) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.opportunity_Type.toLowerCase().indexOf(this.LeadTypeForSearch.toLowerCase()) > -1
    );
    this.getAllOpportunities = this.filteredItems;
  }

  filterByStatus() {
    if (!this.LeadStatusForSearch) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.status.toLowerCase().indexOf(this.LeadStatusForSearch.toLowerCase()) > -1
    );
    this.dataSource = new MatTableDataSource(this.filteredItems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterByLastCall(value) {
    if (!value) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.lastCall.indexOf(value) > -1
    );
    this.dataSource = new MatTableDataSource(this.filteredItems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  clearFilter() {
    this.showMobileNoTextbox = false;
    this.showNameTextbox = false;
    this.showTypeTextbox = false;
    this.showStatusTextbox = false;
    this.showLastCallTextbox = false;
    this.getAllOpportunitiesRequest();

  }

  sendSMS(mobileNos) {

    //  //console.log(mobileNos);
    this.smsForm.value.mobileNumbers = mobileNos;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: 'Are you sure want to send?',
      text: "You won't be able to revert this!",

      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }
    ).then((result) => {
      if (result.value) {
        let objSms = {
          mobileNumbers: this.smsForm.value.mobileNumbers.split(','),
          messageText: this.smsForm.value.messageText,
          smsRouteType: 'TA',
          login_Key: 'debug'
        };
        //console.log(this.smsForm.value);

        this.messageService.sendSMSTemplate(objSms).subscribe(res => {
          if (res.status == "1") {
            this.config.showSuccessMessage(res.message);

          }
          else {
            this.config.showErrorMessage(res.message);
          }
          this.smsForm.setValue({
            mobileNumbers: "",
            messageText: "",
            msgType: ""
          })
        });
      }
    })
  }
  //   IsLead(){
  //     if ( this.userId===10) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  // }
  //   AdminLead(){
  //     debugger
  //     if ( this.userId!==10) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  // }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
