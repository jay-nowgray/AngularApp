import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { ClientsService } from './clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';





@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name','mobile','entityName','email', 'description','action'];
  p:any;
  clients: any;
  EditForm: FormGroup;
  ClientId: number;
  employeeObj: any =[];
  ModalOpen: boolean = false;
  submitted: boolean = false;
  dataSource: MatTableDataSource<unknown>;
  clientsTypeList: any;
  constructor(
    private clientsApi: ClientsService,
    private router: Router,
     private config: Config,
     private route: ActivatedRoute,
     private expensesFormBuilder: FormBuilder
     ) {
       this.ClientId = parseInt(this.route.snapshot.paramMap.get("id"));
       this.EditForm = this.expensesFormBuilder.group({
         client_Id: 0,
         company_Id:0,
         user_Id: 0,
         mobileExt:"",
        name: ["", Validators.required],
        entityName:"",
        mobile: "",
        email: "",
        description:"",
        contact_Name:["", Validators.required],
        address_Type:"",
        client_Type: [0, Validators.required],
        designation:"",
        address_Id:"",
       
       });
     }

  ngOnInit() {
   this.LoadClientList();
   this.getClientType();
  }

  get f() {
    return this.EditForm.controls;
  }
  


  LoadClientList() {
    this.config.startLoader();
    this.clientsApi
      .getClientList()
      .subscribe(res => {
        if ((res.status == '1')) {
          this.dataSource = new MatTableDataSource(res.clients);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
       
          this.config.stopLoader();
        } else {
          this.config.stopLoader();
         
        }
      });
}

saveClients() {

  this.submitted = true;
  if (this.EditForm.invalid) {
  //  Swal.fire("Stop", "Please fill the form to continue", "error");
 
     return;
   }
   else{
    if(this.EditForm.value.client_Id==null)
    {
    this.EditForm.value.client_Id=0,
    this.EditForm.value.company_Id=0
    this.EditForm.value.address_Id=0
    this.EditForm.value.user_Id=0
    }
    // if(this.EditForm.value.mobileExt==null)
    // {
    //   this.EditForm.value.mobileExt = "";
    // }
    // if(this.EditForm.value.mobile==null)
    // {
    //   this.EditForm.value.mobile = "";
    // }
    
    this.submitted = true;
    if (this.EditForm.invalid) {
      this.ModalOpen = true;
      Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;
  
    this.clientsApi.ClientAddUpdate(this.EditForm.value).subscribe(res => {
      if (res.status == "1") {
         this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.LoadClientList();
        this.EditForm.reset();
        //console.log("Success Res==> ", res);
        this.LoadClientList();
      } else {
        Swal.fire("Oops..", res.message, "error");
       
      }
    });
   }

 
  
  this.LoadClientList();
  this.ClientId = 0;
  this.EditForm.reset();
  this.ModalOpen=false;
}


applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}



cancel() {
  this.EditForm.reset();
  this.ModalOpen = false;
  this.submitted = false;
}
AddClient() {
  this.ClientId = 0;
  this.ModalOpen = true;
  this.EditForm.reset();
}
updateClient() {
  //console.log("Success==> ", this.EditForm.value);
  if (this.EditForm.invalid) {
    return;
  } else {
    this.EditForm.value.client_Id = this.ClientId;
    this.clientsApi.ClientAddUpdate(this.EditForm.value).subscribe(res => {
      if (res.status == "1") {
        Swal.fire("Success", res.message, "success");
        this.LoadClientList();
       
       
      } else {
        Swal.fire("Oops..", res.message, "error");

      
      }
    });
    
  }
}

loadClient(client_Id) {
  this.router.navigate(["/crm/edit-clients/" + client_Id]);
}




// async loadClient(client_Id) {
//   this.ModalOpen = true;
//   //console.log(client_Id);
//   this.ClientId = client_Id;
//   this.clientsApi.GetClientsById(this.ClientId).subscribe(
//     res => {
//       //console.log(res);
//       this.EditForm.patchValue({
//         client_Id:res.clients.client_Id,
//         company_Id: res.clients.company_Id,
//         user_Id:res.clients.user_Id,
//         name: res.clients.name,
//         entityName: res.clients.entityName,
//         mobile: res.clients.mobile,
//         email: res.clients.email,
//         description: res.clients.description,
//         contact_Name: res.clients.contact_Name,
//         address_Type: res.clients.address_Type,
//         client_Type: res.clients.client_Type,
//         address_Id:res.clients.address_Id,
//         mobileExt:res.clients.mobileExt,
//         designation:res.clients.designation
//       });
//     },
//     err => {
//       throw new Error(err);
//       //console.log("errrrr", err);
//     }
//   );
// }

  deleteClient(client_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",

      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.clientsApi.Delete(client_Id).subscribe(res => {
          //console.log("ddddddee", res);
          if (res.status == 1) {
            //console.log("dddddd", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.LoadClientList()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            //console.log("dddddd", res);
            this.LoadClientList();
          }
        });
      }
    });
  }

  getClientType() {
    this.clientsApi.getClientType("ClientType").subscribe(
        res => {
        this.clientsTypeList = res.lookupList;
         
        },
        err => {
        
        }
      );
    }
  



}
