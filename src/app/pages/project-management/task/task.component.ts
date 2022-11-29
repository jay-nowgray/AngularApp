import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: any;
  completedTasks: any;
  tasksInReview: any;
  tasksInProgress: any;
 
  constructor(private api: TaskService) { }

  ngOnInit() {
    this.LoadTasks();
  }
  LoadTasks() {
     this.api.getTask(1).subscribe(res => {
       this.tasks = res.tasks.filter(s=> !s.isCompleted && (s.status == null || s.status =='New'));
       this.tasksInReview = res.tasks.filter(s=> !s.isCompleted && s.status =='InReview');
       this.tasksInProgress = res.tasks.filter(s=> !s.isCompleted && s.status =='InProgress');
       this.completedTasks = res.tasks.filter(s=> s.isCompleted);
     });
  }
  

}
