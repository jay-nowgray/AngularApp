import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(
    private config: Config,
    private http: HttpClient,
  ) { }
  attachmentSaveUpdate(data): Observable<any> {
    const url = this.config.APIUrl + "Attachment/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  getByAttachmentId(Id): Observable<any> {
    const url = this.config.APIUrl + "Attachment/GetAttachmentById?Login_Key=" + this.config.login_Key + "&Id=" + Id;
    return this.http.post(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  getAttachmentList(): Observable<any> {
    const url = this.config.APIUrl + "Attachment/GetAttachment?Login_Key=" + this.config.login_Key ;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  delete(Id): Observable<any> {
    const url = this.config.APIUrl + "Attachment/DeleteById?id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http.post(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  postFile(fileToUpload: File): Observable<any> {
    const url = this.config.APIUrl + "Attachment/UploadPhysical?FileName=" + fileToUpload.name;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(url, formData).pipe(catchError(this.config.handleError));
  }
  getByEntity(EntityId, EntityType): Observable<any> {
    const url = this.config.APIUrl + "Attachment/GetAttachmentByEntity?Login_Key=" + this.config.login_Key + "&entityId=" + EntityId + "&entityType=" + EntityType;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

}

