import { Component, OnInit,ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
 selector: 'app-projects',
 templateUrl: './projects.component.html',
 styleUrls: ['./projects.component.scss']
})
 
export class ProjectsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
displayedColumns: string[] = ['project_Name', 'Status', 'start_Date', 'end_Date','client_Name', 'action'];
// paginator: any;
//  sort: any;
 projects: any;
 projectForm: FormGroup;
 EditProjectsUserData: any;
 ModalOpen: boolean = false;
 dataSource: any;
  userType: any;
  projectStatus: any;
  clientList: any;
  submitted: boolean;

 constructor(private api: ProjectService, private formBuilder: FormBuilder,private router: Router) { 
this.projectForm = this.formBuilder.group({
  project_Id: 0,
  company_Id: 0,
  project_Name: ["", Validators.required],
  status: "",
  start_Date: null,
  end_Date: null,
  due_In: 0,
  client_Id: [null, Validators.required],

})

 }
 
 ngOnInit() {
   this.getAllProjectList();
   this.GetProjectsStatus();
   this.LoadClientList();
 }

 getAllProjectList() {
  this.api.getAllProjects().subscribe(
    res => {
  
      this.dataSource = new MatTableDataSource(res.projects);
 //console.log("list", this.dataSource);
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
  this.projectForm.value.client_Id = parseInt(this.projectForm.value.client_Id);
  this.api.saveProject(this.projectForm.value).subscribe(res => {
  if (res.status == 1) {
  //console.log("successss", res);
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
      this.router.navigate(["/project-management/edit-projects/" + Id]);
      //console.log("get id ", Id);
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
 


