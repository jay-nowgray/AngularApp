import { Component, OnInit, ErrorHandler } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router } from "@angular/router";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class   EmployeesComponent implements OnInit {
  getAllEmployee: Array<Object>;
  PageNo: any = 1;
  query: string = "";
  collection = [];
  p: any;

  constructor(
    private api: EmployeeService,
    private config: Config,
    private router: Router
  ) {
    
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.getAllEmployeeRequest();
  }

  async getAllEmployeeRequest() {
    this.config.startLoader();
    this.api
      .getAllEmployees()
      .subscribe(res => {
        if ((res.status = 1)) {
          this.getAllEmployee = res.employee;
          this.config.stopLoader();
        } else {
          this.config.stopLoader();
          //console.log("Something went wrong");
        }
      });
  }

  EditRequestResponse(Id) {
    
    this.getAllEmployeeRequest();
   this.router.navigate(["hrm/edit-employee/" + Id]);
  }

  pageChange(newPage: number) {
    this.router.navigate(["/hrm/employees"], { queryParams: { page: newPage } });
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
}
