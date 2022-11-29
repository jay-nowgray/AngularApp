import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-project-clients',
  templateUrl: './project-clients.component.html',
  styleUrls: ['./project-clients.component.scss']
})
export class ProjectClientsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
displayedColumns: string[] = ['project_Name', 'Status', 'start_Date', 'end_Date','client_Name', 'action'];


@Input() entityId: any;

 projects: any;
 projectForm: FormGroup;
 EditProjectsUserData: any;
 ModalOpen: boolean = false;
 dataSource: any;
  userType: any;
  projectStatus: any;
  clientList: any;
  submitted: boolean;
  Client_Id:any;
  project_Id: any;
  projectId: any;

 constructor(private api: ProjectService, private formBuilder: FormBuilder,private Route: ActivatedRoute,private router: Router, private route: ActivatedRoute) { 
this.projectForm = this.formBuilder.group({
  project_Id: 0,
  company_Id: 0,
  project_Name: ["", Validators.required],
  status: "",
  start_Date: null,
  end_Date: null,
  due_In: 0,
  client_Id: 0,

})
this.Client_Id = parseInt(this.route.snapshot.paramMap.get("Id"));

 }
 
 ngOnInit() {
   this.getAllProjectList();
   this.GetProjectsStatus();
   this.LoadClientList();
 }

 getAllProjectList() {
  this.api.GetProjectByClientId(this.Client_Id).subscribe(
    res => {
    
      this.dataSource = new MatTableDataSource(res.projects);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    err => {
     
    }
  );
 }


 LoadClientList() {
 
  this.api.getClientList().subscribe(res => {
      if ((res.status == '1')) {
      this.clientList = res.clients
     
       
      } else {
       
        
      }
    });
}

get f() {
  return this.projectForm.controls;
}


saveEmployee() {
  //console.log("qwqwewr",this.projectForm.value)
  this.submitted = true;
  if (this.projectForm.invalid) {
  //  Swal.fire("Stop", "Please fill the form to continue", "error");
     return;
   }
  
  if (this.projectForm.value.project_Id == null) {
    this.projectForm.value.project_Id = 0
  }
  
  if (this.projectForm.value.client_Id== null) {
    this.projectForm.value.client_Id = 0
  }
  this.projectForm.value.client_Id = parseInt(this.entityId);;
  this.api.saveProject(this.projectForm.value).subscribe(res => {
  if (res.status == 1) {
  
  Swal.fire("Success", res.message, "success")
  this.submitted = false;
  this.projectForm.reset();
  this.ModalOpen = false;
  this.getAllProjectList();
 
    }
    else {
    err => {
  
       }
        }
      });
    
    }


    editUser(Id){
      this.ModalOpen=true;
      this.api.GetProjectById(Id
        ).subscribe(
        res => {
          //console.log("gfet load data in ingonit", res);
         this.projectForm.setValue({
          project_Id: res.projects.project_Id,
          company_Id: res.projects.company_Id,
          project_Name: res.projects.project_Name,
          status: res.projects.status,
          start_Date: res.projects.start_Date,
          end_Date: res.projects.end_Date,
          due_In: res.projects.due_In,
          client_Id: res.projects.client_Id, 
         //client_Name:res.projects.client_Name
            });
          });
  
        
       
        err => {
         
          throw new Error(err);
        }
     
    }
     
    
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }


     GetProjectsStatus() {
      this.api.GetStatus("ProjectStatus").subscribe(
          res => {
          this.projectStatus = res.lookupList;
           
          },
          err => {
            
          }
        );
      }


addUser() {
this.ModalOpen = true;
}

cancel() {
 this.projectForm.reset();
  this.ModalOpen = false;
}


 }
 



