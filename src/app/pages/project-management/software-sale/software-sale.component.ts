import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SoftwareSaleService } from './software-sale.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-software-sale',
  templateUrl: './software-sale.component.html',
  styleUrls: ['./software-sale.component.scss']
})
export class SoftwareSaleComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['sales_Id', 'contact_Name', 'software_Name', 'purchase_Date', 'expiry_Date', 'total_Amount', 'action'];

  dataSource: any;
  EditForm: FormGroup;
  ModalOpen: boolean = false;
  submitted: boolean = false;
  sale_Id: number;
  clientList: any;
  SaleStatus: any;
  constructor(
    private SaleApi: SoftwareSaleService,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ProjectService,
  ) {
    this.EditForm = this.formBuilder.group({
      sale_Id: 0,
      purchase_Id: 0,
      client_Id: [0, Validators.required],
      purchase_Date: ["", Validators.required],
      expiry_Date: "",
      amount: 0,
      gsT_Amount: 0,
      total_Amount: 0,
      amount_Received: 0,
      renewal_Amount: 0,
      status: "",
      is_Deleted: false,
      dts: "2021-08-19T06:50:45.692Z",
      software_Name: ""
    })
  }

  ngOnInit() {
    this.LoadSaleList();
    this.LoadClientList();
    this.GetSaleStatus();
  }
  LoadSaleList() {
    this.config.startLoader();
    this.SaleApi
      .getAllSale()
      .subscribe(res => {
        if ((res.status == '1')) {
          this.dataSource = new MatTableDataSource(res.slaesList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.config.stopLoader();
        } else {
          this.config.stopLoader();

        }
      });
  }
  get f() {
    return this.EditForm.controls;
  }
  editSale(Id) {
    //console.log("ID-> ", Id)
    this.ModalOpen = true;
    this.SaleApi.GetSaleById(Id).subscribe(
      res => {
        // //console.log("gfet load data in ingonit", res);
        this.EditForm.patchValue({
          sale_Id: res.sales.sale_Id,
          purchase_Id: res.sales.purchase_Id,
          purchase_Date: res.sales.purchase_Date,
          expiry_Date: res.sales.expiry_Date,
          amount: res.sales.amount,
          gsT_Amount: res.sales.gsT_Amount,
          total_Amount: res.sales.total_Amount,
          client_Id: res.sales.client_Id,
          amount_Received: res.sales.amount_Received,
          renewal_Amount: res.sales.renewal_Amount,
          status: res.sales.status,
          is_Deleted: res.sales.is_Deleted,
          dts: res.sales.dts,
          software_Name: res.sales.software_Name,
        });
      });
    err => {

      throw new Error(err);
    }
  }

  Id(Id: any) {
    throw new Error('Method not implemented.');
  }
  GetSaleStatus() {
    this.api.GetStatus("SaleStatus").subscribe(
      res => {
        this.SaleStatus = res.lookupList;

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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  addSale() {
    this.ModalOpen = true;
  }
  saveSale() {
    if (this.EditForm.value.user_Id == null) {
      this.EditForm.value.user_Id = 0;
    }
    if (this.EditForm.value.purchase_Date == "") {
      this.EditForm.value.purchase_Date = "2021-08-19T06:50:45.692Z";
    }
    if (this.EditForm.value.expiry_Date == "") {
      this.EditForm.value.expiry_Date = this.EditForm.value.purchase_Date;
    }

    this.submitted = true;
    if (this.EditForm.invalid) {

      return;
    }
    else {
      if (this.EditForm.value.sale_Id == null) {
        this.EditForm.value.sale_Id = 0
       
        this.EditForm.value.purchase_Id = 0
        this.EditForm.value.is_Deleted=false
        // this.EditForm.value.user_Id=0
      }

      this.submitted = true;
      if (this.EditForm.invalid) {
        this.ModalOpen = true;
        Swal.fire("Stop", "Please fill the form to continue", "error");
        return;
      }

      this.EditForm.value.client_Id = parseInt(this.EditForm.value.client_Id);
      this.EditForm.value.sale_Id = parseInt(this.EditForm.value.sale_Id);
      this.EditForm.value.purchase_Id = parseInt(this.EditForm.value.purchase_Id);
      this.EditForm.value.gsT_Amount = parseInt(this.EditForm.value.gsT_Amount);
      this.EditForm.value.amount = parseInt(this.EditForm.value.amount);
      this.EditForm.value.total_Amount = parseInt(this.EditForm.value.total_Amount);
      this.EditForm.value.amount_Received = parseInt(this.EditForm.value.amount_Received);
      this.EditForm.value.renewal_Amount = parseInt(this.EditForm.value.renewal_Amount);
      this.SaleApi.saveSale(this.EditForm.value).subscribe(res => {
        if (res.status == "1") {
          this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
          this.LoadSaleList();
          this.EditForm.reset();
          //console.log("Success Res==> ", res);
          this.LoadSaleList();
        } else {
          Swal.fire("Oops..", res.message, "error");

        }
      });
    }



    this.LoadSaleList();
    this.sale_Id = 0;
    this.EditForm.reset();
    this.ModalOpen = false;
  }
  cancel() {
    this.EditForm.reset();
    this.ModalOpen = false;
  }
  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
    
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.config.startLoader();
        this.SaleApi.DeleteById(Id).subscribe(res => {
          this.config.startLoader();
          if (res.status == 1) {
           
            this.LoadSaleList()
          } else {
           
            this.LoadSaleList();
          }
        });
      }
    });
  }
}
