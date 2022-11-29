import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AssetsService } from './assets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeinfoService } from '../../hrm/employee-info/employeeinfo.service';

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss']
})
export class AssetsManagementComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serial_Number', 'product_Name', 'product_Type','tangible_Type','place','in_custody_of','purchase_Date','condition', 'action'];
  assetsList: any;
  assetForm: FormGroup;
  assetsId: number;
  employe: any;
  ModalOpen: boolean = false;
  productType: any;
  submitted: boolean = false;
  dataSource: any;
  conditionType: any;
  constructor(
    public assetApi: AssetsService,
    private router: Router,
    private AssetsFormBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeApi:EmployeeinfoService
  ) {
    this.assetsId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.assetForm = this.AssetsFormBuilder.group({
      asset_ID: 0,
      // company_Id: 0,
      serial_Number: "",
      product_Name: ["", Validators.required],
      product_Type: ["", Validators.required],
      tangible_Type: "",
      place: "",
      in_custody_of:"",
      purchase_Date: "",
      vendor: "",
      price: 0,
      expiry_Date: "",
      condition: "",
      scrap_Date: "",
      scrap_Price: 0
      // created_On: ""
    });
  }

  ngOnInit() {
    this.getAsset();
    this.getEmployee();
    this.getTypeofProduct();
    
    this.GetUserTypeList();
  }

 

  get f() {
    return this.assetForm.controls;
  }

  delete(assetsId) {
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
        this.assetApi.DeleteAssets(assetsId).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Unathorized", res.message, "error");
          } else {
            Swal.fire("Success", "Deleted Successfully!", "success");

            this.getAsset();
          }
        });
      }
    });
  }
  getAsset() {
    this.assetApi.GetAssets().subscribe(res => {
     
        this.dataSource = new MatTableDataSource(res.assets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      //console.log("res", res);
     
    });
  }

  // <this is part of add assets model start >

  saveAsset() {
    this.submitted = true;
    if (this.assetForm.invalid) {
      this.ModalOpen = true;
      Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    }
    this.submitted = false;

    //console.log("Success==> ", this.assetForm.value);

    debugger;
    this.assetForm.value.asset_ID = this.assetsId;
    this.assetApi.SaveAssets(this.assetForm.value).subscribe(res => {
      if (res.status == "1") {
        this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.getAsset();
        this.assetForm.reset();
        
      } else {
        Swal.fire("Oops..", res.message, "error");
       
      }
    });
    this.assetsId = 0;
  }

  //  <this is part of add assets model end >

  cancel() {
    this.submitted = false;
    this.assetForm.reset();
    this.ModalOpen = false;
  }
  AddAsset() {
    this.assetsId = 0;
    this.ModalOpen = true;
    this.assetForm.reset();
  }

  // <===========Start model== this is part of edit model==>
  async loadAssets(asset_ID) {
    this.ModalOpen = true;
   
    this.assetsId = asset_ID;
    this.assetApi.GetAssetById(this.assetsId).subscribe(
      res => {
        //console.log("respond", res);

        this.assetForm.patchValue({
          asset_ID: res.assets.asset_ID,
         
          serial_Number:res.assets.serial_Number,
          product_Name: res.assets.product_Name,
          product_Type: res.assets.product_Type,
          tangible_Type: res.assets.tangible_Type,
          place: res.assets.place,
          in_custody_of: res.assets.in_custody_of,
          purchase_Date: res.assets.purchase_Date,
          vendor: res.assets.vendor,
          price: res.assets.price,
          expiry_Date: res.assets.expiry_Date,
          condition: res.assets.condition,
          scrap_Date: res.assets.scrap_Date,
          scrap_Price: res.assets.scrap_Price
         
        });
      },
      err => {
        throw new Error(err);
        
      }
    );
  }
  GetUserTypeList() {
    this.employeeApi.GetByType("conditionType").subscribe(
      res => {
        this.conditionType = res.lookupList;
       
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  // <this is edit and update in model>
  updateAsset() {
    //console.log("Success==> ", this.assetForm.value);
    if (this.assetForm.invalid) {
      return;
    } else {
      this.assetForm.value.asset_ID = this.assetsId;
      this.assetApi.SaveAssets(this.assetForm.value).subscribe(res => {
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.getAsset();
          
        } else {
          Swal.fire("Oops..", res.message, "error");

         
        }
      });
    }
  }
  // <get employee by api>

  getEmployee() {
    this.assetApi.GetEmployee().subscribe(res => {
     
      if (res.status == 1) {
        this.employe = res.user;

        
      } else {
       
      }
    });
  }

  


  getTypeofProduct() {
    this.assetApi.GetProduct("AssetsProduct").subscribe(
        res => {
        this.productType = res.lookupList;
         
        },
        err => {
         
        }
      );
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }


  
}
