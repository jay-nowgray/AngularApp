import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LookupsService } from 'src/app/services/lookups.service';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { AttachmentsService } from './attachments.service';

@Component({
  selector: 'app-global-attachment',
  templateUrl: './global-attachment.component.html',
  styleUrls: ['./global-attachment.component.scss']
})
export class GlobalAttachmentComponent implements OnInit {

  fileToUpload: File = null;
  @Input() attachmentInfo: any;
  @Input() entityType: any;
  @Input() entityId: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['dts', 'attachmentName', 'attachmentUrl', 'action'];
  dataSource: any;
  imageSrc: string = "";
  imageExention: string;
  ModalOpen: boolean = false;
  imgUrl: any;
  userDisabled: boolean;
  userInfo: any;

  attachmentForm = new FormGroup({
    attachmentId: new FormControl(0),
    // entityId: new FormControl(0),
    // companyId: new FormControl(0),
    // entityType: new FormControl(""),
    attachmentName: new FormControl(""),
    attachmentUrl: new FormControl(""),
    attachmentType: new FormControl(""),
    added_By: new FormControl(0),
    isDeleted: new FormControl(false),
    dts: new FormControl("2020-10-04T08:11:56.170Z"),
  });
  Client_Id: number = 0;
  attachmentType: any;
  submitted: boolean;
  employee: any;

  constructor(
    private attachmentApi: AttachmentsService,
    private config: Config,
    private route: ActivatedRoute,
    private lookupApi: LookupsService,
  ) {
    this.Client_Id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userInfo)
    //console.log(this.entityId)
    //console.log(this.entityType)
    this.getAttachments();
    this.getAttachmentTypes();
    if (this.userInfo.userInfo.role_Id > 1) {
      this.userDisabled = true;
    }
  }
  get f() {
    return this.attachmentForm.controls;
  }

  getAttachments() {
    if (this.Client_Id > 0) {
      this.entityId = this.entityId;
    }
    // this.config.startLoader();
    this.attachmentApi.getByEntity(this.entityId, this.entityType).subscribe(res => {
      this.config.stopLoader();
      this.dataSource = new MatTableDataSource(res.attachment);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => {
       
      }
    );
  }

  getAttachmentTypes() {
    this.config.startLoader();
    this.lookupApi.GetBySubType(this.entityType).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.attachmentType = res.lookupList;
      }
      else {

      }
    });
  }

  saveAttatchment() {
    debugger
    this.submitted = true;
 
    // if (this.attachmentForm.invalid) {

    //   return;
    // }
    if (this.attachmentForm.value.attachmentName == null || this.attachmentForm.value.attachmentName == "" || typeof this.attachmentForm.value.attachmentName == 'undefined') {
      Swal.fire("Stop", "Please fill the attachmentname", "error");
      return;
    }
    if (this.fileToUpload == null) {
      Swal.fire("Stop", "Please select the attachmentUrl", "error");
      return;
    }
    this.submitted = false;
    if (this.attachmentForm.value.attachmentId == null) {
      this.attachmentForm.value.attachmentId = 0;
    }
    this.attachmentForm.value.entityId = parseInt(this.entityId);
    this.attachmentForm.value.companyId = 0;
    this.attachmentForm.value.added_By = 0;
    this.attachmentForm.value.isDeleted = false;
    this.attachmentForm.value.entityType = this.entityType;
    this.attachmentForm.value.dts = "2020-10-04T08:11:56.170Z";
    this.attachmentApi.postFile(this.fileToUpload).subscribe(data => {
      this.attachmentForm.value.attachmentUrl = data.result;
      //console.log(data);
      //console.log(this.attachmentForm.value);
      this.attachmentApi.attachmentSaveUpdate(this.attachmentForm.value).subscribe(res => {
        if (res.status == 1) {
          this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
          // this.toastr.success(res.message,
          //   "",
          //   {
          //     timeOut: 4000,
          //     closeButton: true,
          //     enableHtml: true,
          //     positionClass: "toast-top-right",
          //     toastClass: "alert alert-success alert-with-icon",
          //   }
          // )
          this.getAttachments();
          this.attachmentForm.reset();
        } else {
          // this.toastr.error(res.message,
          //   "",
          //   {
          //     timeOut: 4000,
          //     closeButton: true,
          //     enableHtml: true,
          //     positionClass: "toast-top-right",
          //     toastClass: "alert alert-error alert-with-icon",
          //   }
          // )
        }
      });
    
    }, error => {
     
    });

  }
  // loadexpense(Id) {
  //   //console.log("check id", Id)
  //   this.ModalOpen = true;
  //   this.attachmentApi.getByAttachmentId(Id).subscribe(
  //     res => {
  //       this.employee = res.attachment;
  //       //console.log("respond", res);
  //       this.attachmentForm.patchValue({
  //         attachmentId: res.attachment.attachmentId,
  //         entityId: res.attachment.entityId,
  //         companyId: res.attachment.companyId,
  //         entityType: res.attachment.entityType,
  //         attachmentName: res.attachment.attachmentName,
  //         attachmentUrl: res.attachment.attachmentUrl,
  //         attachmentType: res.attachment.attachmentType,
  //         added_By: res.attachment.added_By,
  //         isDeleted: res.attachment.isDeleted,
  //         dts: res.attachment.dts,


  //       });
  //     },
  //     err => {
  //       throw new Error(err);
  //       //console.log("errrrr", err);
  //     }
  //   );



  // }

  cancel() {
    this.attachmentForm.reset();
    this.ModalOpen = false;
    this.submitted = false;
  }

  addAttachment() {
    this.ModalOpen = true;
    this.attachmentForm.reset();
  }

  delete(Id) {
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
        this.attachmentApi.delete(Id).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");

            this.getAttachments()
          } else {

            this.getAttachments();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  // handleInputChange(e) {
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert("invalid format");
  //     return;
  //   }
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  //   this.imageExention = file.name.substring(
  //     file.name.length - 3,
  //     file.name.length
  //   );
  // }

  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   this.imageSrc = reader.result;
  //   //console.log(this.imageSrc);
  // }
  handleFileInput(files: FileList) {
    debugger
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    this.attachmentApi.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
     
    }, error => {
    
    });
  }
}
