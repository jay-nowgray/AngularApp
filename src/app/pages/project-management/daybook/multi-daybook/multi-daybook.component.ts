import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ClientsService } from 'src/app/pages/crm/clients/clients.service';
import { EmployeeService } from 'src/app/pages/hrm/employee.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { Config } from 'src/app/utility/config';
import { DaybookService } from '../daybook.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// import { DateTimeAdapter, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@Component({
  selector: 'app-multi-daybook',
  templateUrl: './multi-daybook.component.html',
  styleUrls: ['./multi-daybook.component.scss']
})
export class MultiDaybookComponent implements OnInit {
  @Output() multiDaybookCancelClick: EventEmitter<any> = new EventEmitter();
  @Output() multiDaybookSaveClick: EventEmitter<any> = new EventEmitter();
  clientForm = new FormGroup({
    client_Id: new FormControl(0),
    email: new FormControl(""),
    address: new FormControl(""),
    name: new FormControl(""),
    type: new FormControl(""),
    pan: new FormControl(""),
    mobile: new FormControl(""),
    remark: new FormControl(""),
    gst: new FormControl(false),
    other: new FormControl(false),
    tally: new FormControl(false),
    company: new FormControl(false),
    it: new FormControl(false),
    client_Type: new FormControl(""),
  });

  multiTaskForm = new FormGroup({
    task_Id: new FormControl(0),
    parentId: new FormControl(0),
    client_Id: new FormControl(0),
  })

  taskMembersForm = new FormGroup({
    task_Id: new FormControl(0),
    assigned_To: new FormControl(0),
    assigned_By: new FormControl(0),
    dts: new FormControl("2020-09-25T12:09:29.200Z")
  });

  clientCheckBoxForm = new FormGroup({
    client_Id: new FormControl(0),
    gst: new FormControl(false),
    other: new FormControl(false),
    tally: new FormControl(false),
    company: new FormControl(false),
    audit: new FormControl(false),
    it: new FormControl(false),
  });

  taskListForm = new FormGroup({
    task_Id: new FormControl(0),
    company_Id: new FormControl(0),
    project_Id: new FormControl(0),
    client_Id: new FormControl(0),
    taskName: new FormControl(""),
    isCompleted: new FormControl(false),
    isDeleted: new FormControl(false),
    status: new FormControl(""),
    created_By: new FormControl(0),
    createdOn: new FormControl("2020-09-25T12:09:29.200Z"),
    remark: new FormControl(""),
    priority: new FormControl(""),
    start_Date: new FormControl("", Validators.required),
    end_Date: new FormControl("", Validators.required),
    dts: new FormControl("2020-09-25T12:09:29.200Z"),
    frequencyInDays: new FormControl(0),
    occurence: new FormControl(0),
    frequencyName: new FormControl(""),
    totalAmount: new FormControl(0),
    paidAmount: new FormControl(0),
    balanceAmount: new FormControl(0),

  });
  workflow: any;
  workflowType: any;
  selectedWork: any;
  ClientList: any;
  EmployeeList: any;
  client_Name: any;
  clientInfo: any;
  newClient: boolean;
  hideSearch: boolean = true;
  taskList: any = [];
  totalFeesAmount: number = 0;
  totalPaid: number = 0;
  totalBalance: number = 0;
  onlyForAdmin: boolean;
  userInfo: any;
  projectStatus: any;
  submitted: boolean;
  constructor(
    private employeeApi: EmployeeService,
    private config: Config,
    private clientApi: ClientsService,
    private CommonApi: LookupsService,

    private dayBookApi: DaybookService,
    // dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // dateTimeAdapter.setLocale('en-IN');
  }


  ngOnInit() {
    this.getEmployeeList();
    this.GetWorkList();
    this.getClientList();
    this.GetWorkType();
    this.getAllProjectList();
    this.taskMembersForm.reset();
    this.taskListForm.patchValue({
      priority: "Medium",
      start_Date: this.config.getCurrentDates(),
      end_Date: this.config.getCurrentDates(),
    })
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userInfo)
    if (this.userInfo.userInfo.role_Id > 1) {
      this.onlyForAdmin = true;
    }
  }
  get f() {
    return this.taskListForm.controls;
  }

  GetWorkList() {
    this.CommonApi.GetByType("workflow").subscribe(res => {
      this.config.stopLoader();
      this.workflow = res.lookupList;
    },
      err => {
        
      }
    );
  }

  GetWorkType() {
    this.CommonApi.GetByType("workflow").subscribe(res => {
      this.config.stopLoader();
      /// this.workflowType = res.result;
      // //console.log(res.result);
      this.workflowType = res.result.sort((a, b) => a.localeCompare(b));
      
    },
      err => {
        
      }
    );
  }

  selectedCategory(val) {
    this.selectedWork = []
    // this.selectedWork = this.workflow.filter(x => x.lookup_SubType === val);
    this.workflow.forEach(element => {
      if (element.lookup_SubType.includes(val)) {
        this.selectedWork.push(element);
      }
    });
  }

  getClientList() {
    this.clientApi.getClientList().subscribe(
      res => {
        this.ClientList = res.clients;
      },
      err => {
        
      }
    );
  }


  getEmployeeList() {
    this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      res => {
        this.EmployeeList = res.user;
      },
      err => {
       
      }
    );
  }

  calculateAmount() {
    //console.log("Working");
    var difference = this.taskListForm.value.totalAmount - this.taskListForm.value.paidAmount;
    this.taskListForm.patchValue({
      balanceAmount: difference
    })
  }

  saveClient() {
    if (this.clientForm.value.client_Id == null || this.clientForm.value.client_Id == 0) {

      this.clientForm.value.client_Id = 0;
    }
    if (this.clientForm.value.gst == null) {
      this.clientForm.value.gst = false;
    }
    if (this.clientForm.value.other == null) {
      this.clientForm.value.other = false;
    }
    if (this.clientForm.value.tally == null) {
      this.clientForm.value.tally = false;
    }
    if (this.clientForm.value.company == null) {
      this.clientForm.value.company = false
    }
    if (this.clientForm.value.it == null) {
      this.clientForm.value.it = false;
    }
    if (this.clientForm.value.audit == null) {
      this.clientForm.value.audit = false;
    }
    //console.log("this.clientForm.value==> ", this.clientForm.value);
    this.config.startLoader();
    this.clientApi.ClientAddUpdate(this.clientForm.value).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        //console.log("Result==> ", res.client)
        this.client_Name = res.client.name;
        this.clientInfo = res.client;
        this.taskListForm.patchValue({
          client_Id: res.client.client_Id
        })
        this.newClient = false;
        Swal.fire("Success", res.message, "success");
        this.getClientList();
      }
    });
  }

  addClient() {
    this.newClient = true;
    this.clientForm.reset();
  }

  cancelClient() {
    this.newClient = false;
    this.clientForm.reset();
  }




  addTaskList() {

    if (this.taskListForm.value.task_Id == null || this.taskListForm.value.task_Id == 0) {
      this.taskListForm.value.task_Id = 0
      this.taskListForm.value.status = 'Pending';
    }

    if (this.taskListForm.value.client_Id == null || this.taskListForm.value.client_Id == 0) {
      Swal.fire("Oops...", "Please Select Client", "error");
      return;
    }
    if (this.taskMembersForm.value.assigned_To == null || this.taskMembersForm.value.assigned_To == 0 || this.taskMembersForm.value.assigned_To == "") {
      Swal.fire("Oops...", "Please Select Employee", "error");
      return;
    }
    if (this.taskListForm.value.start_Date == null || this.taskListForm.value.start_Date == "") {
      Swal.fire("Oops...", "Please Select Start Date", "error");
      return;
    }
    if (this.taskListForm.value.end_Date == null || this.taskListForm.value.end_Date == "") {
      Swal.fire("Oops...", "Please Select End Date", "error");
      return;
    }
    if (this.taskListForm.value.project_Id == null || this.taskListForm.value.project_Id == "") {
      Swal.fire("Oops...", "Please Select Project Name", "error");
      return;
    }
    if (this.taskListForm.value.taskName == null || this.taskListForm.value.taskName == "") {
      Swal.fire("Oops...", "Please Enter Task Name", "error");
      return;
    }
    if (this.taskList.length > 0) {
      let duplicateTask = this.taskList ? this.taskList : [];
      duplicateTask = this.taskList.filter(x => x.taskName === this.taskListForm.value.taskName)
      if (duplicateTask.length > 0) {
        Swal.fire("Sorry", "This task already added in the list please select another task.", "error");
        return;
      }
    }

    if (this.taskListForm.value.created_By == null) {
      this.taskListForm.value.created_By = 0;
    }
    this.taskListForm.value.client_Id = parseInt(this.taskListForm.value.client_Id);

    if (this.taskListForm.value.isCompleted == null) {
      this.taskListForm.value.isCompleted = false;
    }
    if (this.taskListForm.value.createdOn == null) {
      this.taskListForm.value.createdOn = this.config.getCurrentDate();
    }
    if (this.taskListForm.value.project_Id == null) {
      this.taskListForm.value.project_Id = 0;
    } else {
      this.taskListForm.value.project_Id = parseInt(this.taskListForm.value.project_Id);
    }
    if (this.taskMembersForm.value.dts == null) {
      this.taskMembersForm.value.dts = this.config.getCurrentDate();
    }
    if (this.taskMembersForm.value.assigned_By == null) {
      this.taskMembersForm.value.assigned_By = 0;
    }
    if (this.taskMembersForm.value.assigned_To == null) {
      this.taskMembersForm.value.assigned_To = 0;
    }
    if (this.taskMembersForm.value.task_Id == null) {
      this.taskMembersForm.value.task_Id = 0;
    }

    this.taskMembersForm.value.assigned_To = parseInt(this.taskMembersForm.value.assigned_To);
    this.taskListForm.value.members = [this.taskMembersForm.value];

    this.taskList.push(this.taskListForm.value);
    this.totalFeesAmount = 0;
    this.totalPaid = 0;
    this.totalBalance = 0;
    if (this.taskList.length > 0) {
      for (let i = 0; i < this.taskList.length; i++) {
        this.totalFeesAmount += this.taskList[i].totalAmount;
        this.totalPaid += this.taskList[i].paidAmount;
        this.totalBalance += this.taskList[i].balanceAmount;
      }
    }
    this.taskListForm.patchValue({
      task_Id: 0,
      taskName: "",
      remark: "",
      priority: "",
      totalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
    });
    this.taskMembersForm.patchValue({
      assigned_To: 0
    });
   
  }

  saveMultiTask() {
    if (this.taskList.length == 0) {
      Swal.fire({

        title: 'Oops...',
        text: 'Please add one task!',

      })
    }
    this.multiTaskForm.value.client_Id = parseInt(this.taskListForm.value.client_Id);
    if (this.multiTaskForm.value.task_Id == null) {
      this.multiTaskForm.value.task_Id = 0;
    }
    if (this.multiTaskForm.value.parentId == null) {
      this.multiTaskForm.value.parentId = 0;
    }
    this.multiTaskForm.value.taskRequest = this.taskList;

    //console.log("TaskList=> ", this.taskList)
    //console.log("Form Value=> ", this.multiTaskForm.value);
    this.dayBookApi.SaveMultiTask(this.multiTaskForm.value).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        Swal.fire("Success", res.message, "success");
        // this.filter();
        this.taskListForm.reset();
        this.multiDaybookSaveClick.emit();
        // this.taskListForm.reset();
      } else {

      }
    });
  }

  deleteTask(taskName) {
    let rawTaskList = this.taskList ? this.taskList : [];
    rawTaskList = rawTaskList.filter(function (item) {
      return item.taskName !== taskName;
    });
    this.taskList = rawTaskList;
  }

  cancel() {
    this.multiDaybookCancelClick.emit();
  }

  resetDatasourceHandlerClients(data) {
  }

  onClientSelection(data) {
 
    this.taskListForm.patchValue({
      client_Id: data.client_Id
    });

    this.clientCheckBoxForm.patchValue({
      client_Id: data.client_Id,
      gst: data.gst,
      tally: data.tally,
      it: data.it,
      company: data.company,
      other: data.other,
      audit: data.audit
    });

    this.client_Name = data.name;
    this.hideSearch = true;
    this.taskList.forEach(element => {
      element.client_Id = parseInt(data.client_Id);
    });
  }
  onchangeProject(data)
  {
  
    this.dayBookApi.GetProjectById(data).subscribe(
      projres => {
        
        let clientId = projres.projects.client_Id;
        this.dayBookApi.GetClientsById(clientId).subscribe(
          clintres => {
            this.client_Name = clintres.clients.name;
            this.taskListForm.patchValue({
              client_Id: clintres.clients.client_Id
            })
            this.hideSearch = true;
          });
        
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  // updateAssignto(assignTo) {
  //   this.taskList.forEach(element => {
  //     element.members[0].assigned_To = parseInt(assignTo);
  //   });
  //   //console.log("Updated List Assignee=> ", this.taskList)
  // }

  changeClient() {
    this.hideSearch = !this.hideSearch;
  }
  saveDaybook() {

  }
  getAllProjectList() {
    this.dayBookApi.getAllProjects().subscribe(
      res => {
        this.projectStatus = res.projects;
      
      },
      err => {
       
      }
    );
  }



}
