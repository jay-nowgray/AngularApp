import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { Config } from '../utility/config';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: Http, private globalConfig: Config) { }

  getTask(pageNo)   {
    this.globalConfig.resolveLogin_KeyPromise();
      const getApiUrl = this.globalConfig.APIUrl + 'Tasks/GetAll?Login_Key=' + this.globalConfig.login_Key;
           
     
         return this.http.post(getApiUrl, this.globalConfig.httpOptions).pipe(map(res => res.json()));
   }
 getTaskByEmpID(Entity_ID)   {
      const getApiUrl = this.globalConfig.APIUrl + 'Task/GetTaskByEntityId?Entity_Id=' + Entity_ID + '&Login_Key=' + localStorage.getItem("Login_Key");
      
         return this.http.get(getApiUrl).pipe(map(res => res.json()));
   }

   getTaskByTaskID(task_Id)   {
      const getApiUrl = this.globalConfig.APIUrl + 'Task/GetTask?Task_Id=' + task_Id + '&Login_Key=' + localStorage.getItem("Login_Key");
     
         return this.http.get(getApiUrl).pipe(map(res => res.json()));
   }
 
 saveTask(data):any   {
  const getApiUrl = this.globalConfig.APIUrl + 'task?Login_Key=' + localStorage.getItem("Login_Key");
  var headers = new Headers();       
  headers.set('Content-Type', 'application/json' );
  //console.log(data);
  
  
     return this.http.post(getApiUrl, data).pipe(map(res => res.json()));
     ////console.log(this.globalConfig.APIUrl);
}
 
}
