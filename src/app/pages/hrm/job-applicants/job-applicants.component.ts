import { Component, OnInit, ViewChild, ErrorHandler } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OportunityService } from '../../crm/oportunity.service';
import { SmsService } from '../../crm/sms.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort, } from '@angular/material';
@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  smsForm: FormGroup;
  displayedColumns: string[] = ['mobile', 'name', 'status', 'lastCall', 'reminderDate', 'remarks', 'queryFor', 'action'];
  getAllOpportunities: Array<Object>;
  PageNo: any = 1;
  query: string = "";
  collection = [];
  filteredItems: any;
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
  ApplicantsTypeForSearch: any;
  ApplicantsStatusForSearch: any;
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
  }

  async getAllOpportunitiesRequest() {
    this.config.startLoader();
    this.api
      .GetJobApplicants()
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
          //console.log("Something went wrong");
        }
      });
  }


  EditRequestResponse(Id) {
    this.router.navigate(["hrm/edit-job-applicants/" + Id]);
  }

  pageChange(newPage: number) {
    this.router.navigate(["/hrm/job-applicants"], { queryParams: { page: newPage } });
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
  JobApplicantsFilterChange(filterByName) {
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
    //console.log("jayyy",value)
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
    if (!this.ApplicantsTypeForSearch) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.opportunity_Type.toLowerCase().indexOf(this.ApplicantsTypeForSearch.toLowerCase()) > -1
    );
    this.dataSource = new MatTableDataSource(this.filteredItems);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filterByStatus() {
    if (!this.ApplicantsStatusForSearch) {
      this.getAllOpportunitiesRequest();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.getAllOpportunitiesMain).filter(
      Reports =>
        Reports.status.toLowerCase().indexOf(this.ApplicantsStatusForSearch.toLowerCase()) > -1
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
      //  icon: 'warning',
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
