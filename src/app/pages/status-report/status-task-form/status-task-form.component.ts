import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  TaskForm } from '../status-model';

@Component({
  selector: 'app-status-task-form',
  templateUrl: './status-task-form.component.html',
  styleUrls: ['./status-task-form.component.scss']
})
export class StatusTaskFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }


  @Output('newTaskForm') addTaskForm: EventEmitter<TaskForm> = new EventEmitter<TaskForm>();

  form = this.fb.group({
    taskName: '',

  });

  submit() {
    //console.log(this.form.value);
     this.addTaskForm.emit(this.form.value);
 
    this.form.reset();
  }
}
