import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { StatusForm, TaskForm, StatusReportModel, TaskModel } from './status-model';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusReportService } from './status-report.service';
import { Config } from 'src/app/utility/config';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss']
})
export class StatusReportComponent implements OnInit {

  @Output('newStatusForm') submitFormObjectToParent: EventEmitter<StatusForm> = new EventEmitter<StatusForm>();
  submitted: boolean = false;
  alreadySubmitted: boolean = false;
  login_key: any;
  buttonHasBeenClicked: boolean = false;
  userObj: any;
  myDate = new Date();
  failedMsg: any;

  constructor(private fb: FormBuilder, private router: Router, private config: Config,
    private Route: ActivatedRoute, private StatusReportAPI: StatusReportService) {

    this.login_key = this.Route.snapshot.paramMap.get("key");
  }
  form = this.fb.group({
    note: ['', Validators.required],

    Tasks: this.fb.array([], this.minFormArrayLength(1))
  });


  ngOnInit() {
    this.loadData();
  }



  loadData() {
    this.config.startLoader();
    this.StatusReportAPI.getStatusInfo(this.login_key).subscribe(res => {
      if(res.status=="1")
      {
        this.userObj = res;
        this.alreadySubmitted =false;
      }else{
        this.failedMsg = res.message;
        this.alreadySubmitted =true;
      }
      this.config.stopLoader();
    
       
    });
  }

  form2 = new FormArray([]);

  addSubForm(subForm: StatusForm) {
    this.form2.push(this.fb.group(subForm));
  }





  get Tasks(): TaskForm[] {
    return this.form.get('Tasks').value;
  }

  get thereIsAtLeastOneItemInTasksArray(): boolean {
    return (this.form.get('Tasks') as FormArray).length > 0;
  }

  submit() {

    const control = this.form.get("Tasks") as FormArray;
    let totalItems = control.value.length;
    if(this.form.value.note =='')
    {
      Swal.fire(
        'Caution!',
        'You missed the summary.',
        'error'
      )
      return;
    }
    if(totalItems <= 0)
    {
      Swal.fire(
        'Caution!',
        'You have not added any tasks.',
        'error'
      )
      return;
    }
   // //console.log(this.form.value);
 this.config.startLoader();
   // return
    //this.submitFormObjectToParent.emit(this.form.value);
    var statusReportModel = {} as StatusReportModel;
    statusReportModel.id = 0;
    statusReportModel.note = this.form.value.note;
    statusReportModel.userId = this.userObj.userInfo.user_Id;
    statusReportModel.reportDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US'); 
    statusReportModel.supervisorRating = 0;

    var taskList = [];
   
    let i = 0;
    while (i < totalItems) {
      var taskModel = {} as TaskModel;
      taskModel.id = 0;
      taskModel.isCompleted = false;
      taskModel.taskName = control.at(i).value.taskName;
      taskList.push(taskModel);
      i++;
    }


    statusReportModel.tasks = taskList;

    //console.log(statusReportModel);

    this.StatusReportAPI.saveStatusInfo(statusReportModel).subscribe(res => {
      this.config.stopLoader();
      if(res.status=="1")
      {
        Swal.fire(
          'Yeah!',
          'You made it.',
          'success'
        )
        this.submitted =true;
      }else{
        this.failedMsg = res.message;
      }
    });
    // this.emptyTasks();
    // this.form.reset();
  }

  addNewTaskForm(task: TaskForm) {
    const control = this.form.get('Tasks') as FormArray;
    control.push(this.fb.group(task));
  }

  removeTask(i) {
    const control = this.form.get("Tasks") as FormArray;

    control.removeAt(i);

  }

  emptyTasks() {
    const control = this.form.get("Tasks") as FormArray;
    let totalItems = control.value.length;
    while (totalItems > 0) {
      totalItems--;
      control.removeAt(totalItems);
    }
  }

  minFormArrayLength(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) return null;
      return { 'minLengthArray': { valid: false } };
    }
  }
}