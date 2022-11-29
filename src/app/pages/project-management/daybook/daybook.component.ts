import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';




import { LookupsService } from 'src/app/services/lookups.service';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { ClientsService } from '../../crm/clients/clients.service';
import { EmployeeService } from '../../hrm/employee/employee.service';


import { DaybookService } from './daybook.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css']
})
export class DaybookComponent implements OnInit {
  filterActive: boolean = false;
  filterValue: any = '';


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['taskName', 'assigned_ToName', 'end_Date', 'status', 'isCompleted', 'action'];
  //columnsToDisplay: string[] = ['task_Id', 'createdOn', 'client_Name', 'taskName', 'assigned_ToName', 'start_Date', 'end_Date', 'total_Amount', 'paid_Amount', 'balance_Amount', 'status', 'isCompleted', 'action'];
  dataSource: any;
  submitted: boolean;
  ModalOpen: boolean;
  user_Id: number;
  EmployeeList: any;
  DaybookList: any;
  ClientList: any;
  workflow: any;
  client: any;
  work: any;
  employees: any;
  userDetails: any;
  newClient: boolean = false;
  multiDaybook: boolean = false;
  selectedFrequencyName: any = "";
  selectedFrequencyValue: any = 0;
  client_NameforFilter: any;
  taskType: any = "";
  fromDate: any;
  toDate: any;
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
  clientCheckBoxForm = new FormGroup({
    client_Id: new FormControl(0),
    gst: new FormControl(false),
    other: new FormControl(false),
    tally: new FormControl(false),
    company: new FormControl(false),
    it: new FormControl(false),
    audit: new FormControl(false),
  });

  taskMembersForm = new FormGroup({
    task_Id: new FormControl(0),
    assigned_To: new FormControl(0),
    assigned_By: new FormControl(0),
    dts: new FormControl("2020-09-25T12:09:29.200Z")
  });

  daybookForm = new FormGroup({
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
    start_Date: new FormControl("2020-09-25T12:09:29.200Z", Validators.required),
    end_Date: new FormControl("2020-09-25T12:09:29.200Z", Validators.required),
    dts: new FormControl("2020-09-25T12:09:29.200Z"),
    frequencyInDays: new FormControl(0),
    occurence: new FormControl(0),
    frequencyName: new FormControl(""),
    totalAmount: new FormControl(0),
    paidAmount: new FormControl(0),
    balanceAmount: new FormControl(0),

  });
  taskFrequency: any;
  hideSearch: boolean = true;
  client_Name: any;
  client_Id: 0;
  clientInfo: any;
  totalAmount: number = 0;
  selectedWorkFlow: any = [];
  bystatus: any = "";
  totalPaid: number = 0;
  totalBalance: number = 0;
  workflowType: any;
  selectedWork: any;
  hideForUser: boolean = false;
  onlyForAdmin: boolean = false;
  AllTasks: any;
  commentList: any;
  selectedClientforfilter: any = [];
  assignTo: any = 0;
  projectStatus: any;
  keyword: string;
  btxUser: boolean = false;
  currentUserId: any;
  commentObj: any;
  toastr: any;
  selectedDaybookIds: any = [];
  userType: any;
  priority: any;
  clientType: any;
  status: any;
  constructor(
    private employeeApi: EmployeeService,
    private clientsApi: ClientsService,
    private config: Config,
    private dayBookApi: DaybookService,
    private CommonApi: LookupsService,
    private router: Router,

    //private toastr: ToastrService
  ) {

    this.commentObj = {
      comment_Id: 0,
      task_Id: 0,
      comment: "",
      commentBy: 0,
      isDeleted: false,
      dts: ""
    }
  }

  ngOnInit() {
    this.GetStatus();
this.GetClientType();
    this.Getpriority();
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
    // var obj = JSON.parse(localStorage.getItem("userObj"));
    // this.userType = this.userDetails.userInfo.role_Id;
   
    if (this.userDetails.userInfo.role_Id > 1) {
      this.hideForUser = true;
    }
    if (this.userDetails.userInfo.workingFor == 'bentex' || this.userDetails.userInfo.workingFor == 'Bentex') {
      this.btxUser = true;
    } else {
      this.btxUser = false;
    }
    this.currentUserId = this.userDetails.userInfo.user_Id;
   

    //console.log(this.currentUserId)
    this.getDaybookList();
    this.getEmployeeList();
    this.GetWorkList();
    this.getClientList();
    this.GetTaskFrequency();
    this.GetWorkType();
    this.getAllProjectList();

  }
  public selectDaybook(value, id) {
    if (value.target.checked == true) {
      this.selectedDaybookIds.push(id);
    }
    else {
      this.selectedDaybookIds = this.selectedDaybookIds.filter(x => x !== id);
    }
  }
  IsBtxManager() {
    if (this.currentUserId == 16) {
      return true;
    } else {
      return false;
    }
  }
  Admin() {
    if (this.currentUserId === 1) {
      return true;
    } else {
      return false;
    }
  }
  get f() {
    return this.daybookForm.controls;
  }
  getDaybookList() {
    this.config.startLoader();
    this.dayBookApi.GetAll(null).subscribe(
      res => {
        this.config.stopLoader();
        this.AllTasks = res.tasks;
        this.dataSource = new MatTableDataSource(res.tasks);
        if (this.filterActive) {
          this.daybookCustomFilter(this.filterValue);
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount();
      },
      err => {
        
      }
    );
  }
  onClientSelectionFilter(data) {
    this.selectedClientforfilter = [];
    this.selectedClientforfilter.push(data.client_Id)
    this.client_NameforFilter = data.name;
  }
  resetDatasourceHandlerClientsfilter(data) {

  }
  getWorkFlow(val) {
    this.selectedWorkFlow = val;
    
  }
  deleteComment(comment) {
    this.commentObj.task_Id = this.daybookForm.value.task_Id;
    this.commentObj.comment_Id = comment.comment_Id;
    this.commentObj.comment = comment.comment;
    this.commentObj.dts = this.config.getCurrentDate();
    this.commentObj.isDeleted = true;
   
    this.dayBookApi.SaveUpdateTaskComment(this.commentObj).subscribe(res => {
      if (res.status == 1) {

        this.commentList = res.taskComments;
        this.clearCommentForm();
      }
      else {
      }
    })
  }
  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Daybook List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Daybook list'
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.AllTasks.map(({ client_Name, entityName, taskName, isCompleted, status, remark, start_Date, end_Date, createdByName, total_Amount, paid_Amount, balance_Amount, priority, frequency, createdOn, assigned_ToName }) => ({ client_Name, entityName, taskName, isCompleted, status, remark, start_Date, end_Date, createdByName, total_Amount, paid_Amount, balance_Amount, priority, frequency, createdOn, assigned_ToName }))
    csvExporter.generateCsv(final);
  }
  filter() {
    let data = {
      assigned_To: parseInt(this.assignTo),
      assigned_By: 0,
      isCompleted: "",
      status: this.bystatus,
      keyword: "",
      workflows: this.selectedWorkFlow,
      dateRangeStart: this.fromDate,
      dateRangeEnd: this.toDate,
      clients: this.selectedClientforfilter
    }
    //console.log("selected data", data)
    if (
      data.assigned_To == 0 &&
      data.assigned_By == 0 &&
      data.isCompleted == "" &&
      data.keyword == "0" &&
      (data.status == "" || typeof data.status == 'undefined') &&
      (data.dateRangeStart == null || typeof data.dateRangeStart == 'undefined' || data.dateRangeStart == "") &&
      (data.dateRangeEnd == null || typeof data.dateRangeEnd == 'undefined' || data.dateRangeEnd == "") &&
      (data.workflows == null || data.workflows.length == 0) &&
      (data.clients == null || data.clients.length == 0)
    ) {
      data = null
      data.isCompleted = "false"
    }
    if (data.dateRangeStart == null || typeof data.dateRangeStart == 'undefined' || data.dateRangeStart == "") {
      data.dateRangeStart = null;
    }
    if (data.dateRangeEnd == null || typeof data.dateRangeEnd == 'undefined' || data.dateRangeEnd == "") {
      data.dateRangeEnd = null;
    }
    if (data.keyword == null || typeof data.keyword == 'undefined') {
      data.keyword = " ";
    }
   
    this.dayBookApi.GetAll(data).subscribe(
      res => {
        this.getEmployeeList();
        this.GetWorkList();
        this.getClientList();
        this.GetTaskFrequency();
        this.GetWorkType();
    
        this.AllTasks = res.tasks;
        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount();
     
      },
      err => {
      
        this.config.stopLoader();
      }
     
    );
  }


  clearFilter() {
    this.assignTo = 0;
    this.bystatus = "";
    this.keyword = "";
    this.fromDate = null;
    this.toDate = null;
    this.selectedWorkFlow = [];
    this.selectedClientforfilter = [];
    this.client_NameforFilter = "";
    this.config.startLoader();
    this.dayBookApi.GetAll(null).subscribe(
      res => {
        this.config.stopLoader();
        this.AllTasks = res.tasks;
        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount();
        this.getDaybookList();
      },
      err => {
       
        this.config.stopLoader();
      }
    );

  }
  checkValue(event, taskId) {
    let isApproved = event.target.checked
    this.dayBookApi.saveUpdateapproved(taskId, isApproved).subscribe(res => {
      if (res.status == 1) {
        this.ModalOpen = false;
        this.config.stopLoader();
        Swal.fire("Success", res.message, "success");
      }
      else {
        Swal.fire("Oops..", res.message, "error");
        this.filter();
      }
    });
  }

  daybookCustomFilter(filterValue) {
 
    let tempData = this.AllTasks;
    let newData = [];
    if (filterValue !== '') {
      this.filterActive = true;
      if (filterValue == 'Pending') {
        newData = tempData.filter(x => x.status === 'Pending');
      }
      else if (filterValue == 'InProgress') {
        newData = tempData.filter(x => x.status === 'InProgress');
      }
      else if (filterValue == 'Completed') {
        newData = tempData.filter(x => x.status === 'Completed');
      } else {
        if (this.filterActive) {
          this.dataSource = new MatTableDataSource(tempData);
          this.applyFilter(filterValue);
          return;
        }
        else {
          newData = tempData;
        }
      }
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilter(this.filterValue);
    }
    else {
      this.filterActive = false;
      this.dataSource = new MatTableDataSource(tempData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilter(this.filterValue);
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue !== '') {
      this.filterActive = true;
    } else {
      this.filterActive = false;

    }
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.getTotalAmount();
  }

  getTotalAmount() {
    this.totalAmount = 0;
    this.totalPaid = 0;
    this.totalBalance = 0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalAmount += this.dataSource.filteredData[i].total_Amount;
      this.totalPaid += this.dataSource.filteredData[i].paid_Amount;
      this.totalBalance += this.dataSource.filteredData[i].balance_Amount;
    }
  }

  onDateChange() {
    let data = {
      assigned_To: 0,
      assigned_By: 0,
      start_Date: this.fromDate,
      isCompleted: "",
      dateRangeStart: this.fromDate,
      dateRangeEnd: this.toDate
    }
    // this.config.startLoader();
    this.dayBookApi.GetAll(data).subscribe(
      res => {
        // this.config.stopLoader();
        this.DaybookList = res.tasks;

        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount();
      },
      err => {
       
      }
    );
  }

  getEmployeeList() {

    this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      res => {
        //console.log("if k pahle", res)
        // if (this.IsBtxManager()) {
        //   this.EmployeeList = res.user;
        //   //console.log("if k bad")
        // } 
        // else {
        this.EmployeeList = res.user;
        // }
        //this.EmployeeList = res.user;
      },
      err => {
       
      }
    );
  }

  getClientList() {
    this.clientsApi.getClientList().subscribe(
      res => {
        this.ClientList = res.clients;
      },
      err => {
      
      }
    );
  }

  GetWorkList() {
    this.CommonApi.GetByType("workflow").subscribe(res => {
      this.workflow = res.lookupList;
    },
      err => {
       
      }
    );
  }
  GetStatus() {
    this.CommonApi.GetByType("status").subscribe(res => {
      this.status = res.lookupList;
    },
      err => {
       
      }
    );
  }
  GetClientType() {
    this.CommonApi.GetByType("clientType").subscribe(res => {
      this.clientType = res.lookupList;
    },
      err => {
       
      }
    );
  }
  Getpriority() {
    this.CommonApi.GetByType("priority").subscribe(res => {
      this.priority = res.lookupList;
    },
      err => {
        
      }
    );
  }

  GetWorkType() {
    this.CommonApi.GetByType("workflow").subscribe(res => {
      this.config.stopLoader();
      this.workflowType = res.result;
    },
      err => {
       
      }
    );
  }

  selectedCategory(val) {
    this.selectedWork = this.workflow.filter(x => x.lookup_SubType === val);
  }

  cancel() {
    this.submitted = false;
    this.daybookForm.reset();
    this.ModalOpen = false;
  }

  addMultiDaybook() {
    this.client_Name = "";
    this.multiDaybook = true;

  }

  closeMultiDaybookSaveModal() {
    this.multiDaybook = false;
    this.filter();
    this.getDaybookList();
  }

  closeMultiDaybookModal() {
    this.multiDaybook = false;
  }

  addDaybook() {
    this.user_Id = 0;
    this.client_Name = '';
    this.ModalOpen = true;
    this.daybookForm.reset();
    this.taskMembersForm.reset();
    this.clientForm.reset();
    this.daybookForm.patchValue({
      priority: 'Medium',
      task_Id: 0,
      start_Date: this.config.getCurrentDates(),
      end_Date: this.config.getCurrentDates(),
      totalAmount: 0,
      paidAmount: 0,
      balanceAmount: 0,
    });
    this.getDaybookList();
    this.onlyForAdmin = false;
  }

  addClient() {
    this.newClient = true;
    this.clientForm.reset();
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
    this.clientsApi.ClientAddUpdate(this.clientForm.value).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.config.stopLoader();
        this.client_Name = res.client.name;
        this.clientInfo = res.client;
        this.daybookForm.patchValue({
          client_Id: res.client.client_Id
        })
        this.newClient = false;
        // this.toastr.success(res.message, "",
        //   {
        //     timeOut: 4000,
        //     closeButton: true,
        //     enableHtml: true,
        //     positionClass: "toast-top-right",
        //     toastClass: "alert alert-success alert-with-icon",
        //   });
        // this.getClientList();
      }
    });
  }



  cancelClient() {
    this.newClient = false;
    this.client_Name = "";
    this.clientForm.reset();
  }
  // Comment
  saveComment() {
    if (this.commentObj.comment === "" || this.commentObj.comment === null || typeof this.commentObj.comment === 'undefined') {
    }
    this.commentObj.task_Id = this.daybookForm.value.task_Id;
    this.commentObj.dts = this.config.getCurrentDate();
    this.commentObj.isDeleted = false;
    
    this.dayBookApi.SaveUpdateTaskComment(this.commentObj).subscribe(res => {
      if (res.status == 1) {
        this.commentList = res.taskComments;
        this.clearCommentForm();
      }
      else {

      }
    });
  }
  clearCommentForm() {
    this.commentObj.comment = "";
    this.commentObj.task_Id = 0;
    this.commentObj.commentBy = 0;
    this.commentObj.comment_Id = 0;
    this.commentObj.isDeleted = false;
  }
  getComment(id) {
    this.dayBookApi.GetCommentsByTaskId(id).subscribe(res => {
      if (res.status == 1) {
        this.commentList = res.taskComments;
      }
    });
  }

  saveDaybook() {
    //console.log("form value ",this.daybookForm.value)
    this.submitted = true;
    if (this.daybookForm.invalid) {
      this.ModalOpen = true;
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    else {
      if (this.daybookForm.value.task_Id == null || this.daybookForm.value.task_Id == 0) {
        this.daybookForm.value.task_Id = 0
        this.daybookForm.value.status = 'Pending';
      }
      if (this.daybookForm.value.client_Id == null || this.daybookForm.value.client_Id == 0) {
        alert('invlaid client')
        return;
      }

      if (this.daybookForm.value.company_Id == null) {
        this.daybookForm.value.company_Id = 0;
      }
      if (this.daybookForm.value.project_Id == null) {
        this.daybookForm.value.project_Id = 0;
      } else {
        this.daybookForm.value.project_Id = parseInt(this.daybookForm.value.project_Id);
      }

      if (this.daybookForm.value.created_By == null) {
        this.daybookForm.value.created_By = 0;
      }
      this.daybookForm.value.client_Id = parseInt(this.daybookForm.value.client_Id);

      this.daybookForm.value.company_Id = parseInt(this.daybookForm.value.company_Id);
      if (this.daybookForm.value.isCompleted == null) {
        this.daybookForm.value.isCompleted = false;
      }
      if (this.daybookForm.value.isDeleted == null) {
        this.daybookForm.value.isDeleted = false;
      }
      if (this.daybookForm.value.dts == null) {
        this.daybookForm.value.dts = this.config.getCurrentDate();
      }
      if (this.daybookForm.value.createdOn == null) {
        this.daybookForm.value.createdOn = this.config.getCurrentDate();
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
      if (this.taskMembersForm.value.dts == null) {
        this.taskMembersForm.value.dts = this.config.getCurrentDate();
      }
      if (this.daybookForm.value.occurence == null) {
        this.daybookForm.value.occurence = 0;
      }
      this.daybookForm.value.frequencyName = this.selectedFrequencyName;
      this.daybookForm.value.frequencyInDays = parseInt(this.selectedFrequencyValue);
      this.daybookForm.value.taskType = this.taskType;
      if (this.daybookForm.value.taskType == "") {
        this.daybookForm.value.taskType = 'Single';
      }
    }
    this.taskMembersForm.value.assigned_To = parseInt(this.taskMembersForm.value.assigned_To);
    this.daybookForm.value.members = [this.taskMembersForm.value];
    //console.log("Form Value=> ", this.daybookForm.value);
    if (this.commentObj.comment != "" ) {
    this.commentObj.task_Id = this.daybookForm.value.task_Id;
    this.commentObj.dts = this.config.getCurrentDate();
    this.commentObj.isDeleted = false;
  
    this.dayBookApi.SaveUpdateTaskComment(this.commentObj).subscribe(res => {
      if (res.status == 1) {
        this.commentList = res.taskComments;
        this.clearCommentForm();
      }
      else {

      }
    });
  }
    this.config.startLoader();
    this.dayBookApi.saveUpdateDaybook(this.daybookForm.value).subscribe(res => {
      if (res.status == 1) {

        this.ModalOpen = false;
        this.config.stopLoader();
        this.getDaybookList();
        Swal.fire("Success", res.message, "success");
       this.daybookForm.reset();
      }

      else {
        err => {
         
        }
        // this.toastr.error(res.message, "",
        //   {
        //     timeOut: 4000,
        //     closeButton: true,
        //     enableHtml: true,
        //     positionClass: "toast-top-right",
        //     toastClass: "alert alert-error alert-with-icon",
        //   });
      }
    });
  }

  GetTaskFrequency() {
    this.CommonApi.GetByType("TaskFrequency").subscribe(res => {
      this.taskFrequency = res.lookupList;
    },
      err => {
       
      });
    // });
  }

  changeTaskType(val) {
    this.taskType = val;
   
  }

  selectedFrequency(e) {
    this.selectedFrequencyName = e.target.options[e.target.options.selectedIndex].text;
    this.selectedFrequencyValue = e.target.value;
  }

  async editDaybook(id) {
    this.client_Name = '';
    this.clientInfo = null;
    this.config.startLoader();
    this.ModalOpen = true;
    this.dayBookApi.getDaybookById(id).subscribe(
      res => {
        this.config.stopLoader();
        if (this.userDetails.userInfo.role_Id > 1 && res.tasks.task_Id > 0) {
          this.onlyForAdmin = true;
        }
        //console.log(res)
        this.selectedFrequencyName = res.tasks.frequencyName;
        this.selectedFrequencyValue = res.tasks.frequencyInDays;
        this.daybookForm.patchValue({
          task_Id: res.tasks.id,
          company_Id: res.tasks.company_Id,
          project_Id: res.tasks.project_Id,
          client_Id: res.tasks.client_Id,
          taskName: res.tasks.taskName,
          isCompleted: res.tasks.isCompleted,
          isDeleted: res.tasks.isDeleted,
          status: res.tasks.status,
          created_By: res.tasks.created_By,
          createdOn: res.tasks.createdOn,
          remark: res.tasks.remark,
          priority: res.tasks.priority,
          start_Date: res.tasks.start_Date,
          end_Date: res.tasks.end_Date,
          dts: res.tasks.dts,
          frequencyInDays: res.tasks.frequencyInDays,
          occurence: res.tasks.occurence,
          frequencyName: res.tasks.frequencyName,
          totalAmount: res.tasks.totalAmount,
          paidAmount: res.tasks.paidAmount,
          balanceAmount: res.tasks.balanceAmount,
        });
        this.getComment(id)
        this.client_Name = res.result.name;
        this.clientInfo = res.result;
        this.client_Name = res.result.name;
        this.clientInfo = res.result;
        this.clientCheckBoxForm.patchValue({
          client_Id: this.clientInfo.client_Id,
          gst: this.clientInfo.gst,
          tally: this.clientInfo.tally,
          it: this.clientInfo.it,
          company: this.clientInfo.company,
          other: this.clientInfo.other,
          audit: this.clientInfo.audit,
        })
        // this.getDaybookList();
        this.taskMembersForm.patchValue({
          task_Id: res.tasks.members[0].task_Id,
          assigned_To: res.tasks.members[0].assigned_To,
          assigned_By: res.tasks.members[0].assigned_By,
          dts: res.tasks.members[0].dts
        });
      },
      err => {
        
      }
    );

  }
  // getComment(id) {
  //   this.dayBookApi.GetCommentsByTaskId(id).subscribe(res => {
  //     if (res.status == 1) {
  //       this.commentList = res.taskComments;
  //     }
  //   });
  // }


  calculateAmount() {
    var difference = this.daybookForm.value.totalAmount - this.daybookForm.value.paidAmount;
    this.daybookForm.patchValue({
      balanceAmount: difference
    })
  }

  deleteDaybook(id) {

    Swal.fire({
      title: 'Are you sure want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this.dayBookApi.deleteDaybook(id).subscribe(res => {

          // this.toastr.success("Deleted successfully!", "",
          //   {
          //     timeOut: 4000,
          //     closeButton: true,
          //     enableHtml: true,
          //     positionClass: "toast-top-right",
          //     toastClass: "alert alert-success alert-with-icon",
          //   });
          this.getDaybookList();
        });
      }
    });
  }
  resetDatasourceHandlerClients(data) {
    //  //console.log(data);
    // this.daybookForm.value.client_Id = data[0].client_Id;
    // this.client_Name = data[0].client_Name;
    // this.hideSearch=true;
  }
  onClientSelection(data) {
    //console.log(data);
    this.daybookForm.patchValue({
      client_Id: data.client_Id
    })
    this.clientCheckBoxForm.patchValue({
      client_Id: data.client_Id,
      gst: data.gst,
      tally: data.tally,
      it: data.it,
      company: data.company,
      other: data.other,
      audit: data.audit,
    })
    this.client_Name = data.name;
    this.hideSearch = true;
  }
  changeClient() {
    this.hideSearch = !this.hideSearch;
  }
  // openInvoice(id) {
  //   this.router.navigateByUrl('invoice/' + id);
  // }
  onchangeProject(data)
  {
  
    this.dayBookApi.GetProjectById(data).subscribe(
      projres => {
       
        let clientId = projres.projects.client_Id;
        this.dayBookApi.GetClientsById(clientId).subscribe(
          clintres => {
            this.client_Name = clintres.clients.name;
            this.daybookForm.patchValue({
              client_Id: clintres.clients.client_Id
            })
            this.hideSearch = true;
          });
        
      },
      err => {
       
      }
    );
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
