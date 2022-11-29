import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
@Component({
  selector: 'app-task-clients',
  templateUrl: './task-clients.component.html',
  styleUrls: ['./task-clients.component.scss']
})
export class TaskClientsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['task_Id', 'createdOn', 'project_Name','taskName', 'assigned_ToName', 'start_Date', 'end_Date', 'status', 'isCompleted',];
  
  dataSource: any;
  @Input() entityId: any;
  ClientId: any;


  constructor(private clientsApi: ClientsService, private route: ActivatedRoute) { 

    this.ClientId = parseInt(this.route.snapshot.paramMap.get("Id"));
  }

  ngOnInit() {
   
    this.getClient();
  }


  getClient() {
   this.clientsApi.GetClintById(this.ClientId).subscribe(
      res => {
       
        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      
      },
      err => {
       
       
      });
    }
  }
