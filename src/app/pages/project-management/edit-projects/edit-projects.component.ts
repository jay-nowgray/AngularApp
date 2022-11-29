import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit {
  editProjectForm: FormGroup;
  projectId: any;
  project_Id: string;
  projectStatus: any;
  clientList: any;
  submitted: boolean;


  constructor(  private formBuilder: FormBuilder, private api: ProjectService, private router: Router, private Route: ActivatedRoute,) {
    this.editProjectForm = this.formBuilder.group({
       project_Id: "",
        company_Id: 0,
        project_Name: ["", Validators.required],
        status: "",
        start_Date: "",
        end_Date: "",
        due_In: 0,
        client_Id:  [0, Validators.required],
        // client_Name:""
       
      }),
   

    this.projectId = this.Route.snapshot.paramMap.get("Id");
    }

  ngOnInit() {
    this.loadProjectById();
    this.GetProjectsStatus();
    this.  LoadClientList() ;

  }

   loadProjectById() {
   this.api.GetProjectById(this.projectId).subscribe(
      res => {
        //console.log("gfet load data in ingonit", res);
       this.editProjectForm.setValue({
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
  get f() {
    return this.editProjectForm.controls;
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
    LoadClientList() {
 
      this.api.getClientList().subscribe(res => {
          if ((res.status == '1')) {
          this.clientList = res.clients
         
           
          } else {
           
           
          }
        });
    }


  updateProjects(){
    this.submitted = true;
    if (this.editProjectForm.value.project_Id == null) {
      this.editProjectForm.value.project_Id = 0
    }
    
    if (this.editProjectForm.invalid) {
      Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
    this.editProjectForm.value.client_Id = parseInt(this.editProjectForm.value.client_Id);
  //console.log("formValue", this.editProjectForm.value);
this.api.saveProject(this.editProjectForm.value).subscribe(res => {
      if (res.status == 1) {
      //console.log("update info", res);
      Swal.fire("Success", res.message, "success")
        }
        else {
        err => {
      
           }
            }
          });
        
        }
  
  close(){
    this.router.navigate(["/project-management/projects"]);
}

}
