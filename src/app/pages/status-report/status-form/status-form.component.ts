import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators, AbstractControl} from "@angular/forms";
 
import { TaskForm, StatusForm } from '../status-model';
 

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    
  }
 


  @Output('newStatusForm') submitFormObjectToParent: EventEmitter<StatusForm> = new EventEmitter<StatusForm>();


  form = this.fb.group({
    note: ['', Validators.required],
    
    Tasks: this.fb.array([], this.minFormArrayLength(1))
  });

  get Tasks(): TaskForm[] {
    return this.form.get('Tasks').value;
  }

  get thereIsAtLeastOneItemInTasksArray(): boolean {
    return (this.form.get('Tasks') as FormArray).length > 0;
  }

  submit() {
    this.submitFormObjectToParent.emit(this.form.value);
    this.emptyTasks();
    this.form.reset();
  }

  addNewTaskForm(task: TaskForm) {
    const control = this.form.get('Tasks') as FormArray;
    control.push(this.fb.group(task));
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
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min) return null;
      return { 'minLengthArray': {valid: false }};
    }
  }
}
