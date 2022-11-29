export interface TaskForm {
  //id: 0,
  taskName: string;
  // isCompleted: boolean;
  // taskDetail: {
  //   company_Id: number;
  //   project_Id:  number;
  //   taskDetailId: number;
  //   assigned_To:  number;
  //   assigned_By:  number;
  //   description: string;
  //  start_Date: string;
  //   end_Date: string;
  // }
}
  export interface  StatusForm {
   // id: number;
   // reportDate: string;
   // userId: number;
    note: string;
   // supervisorRating: number;
    tasks: TaskForm[];
  }
  export interface  StatusReportModel {
    id: number;
    reportDate: string;
    userId: number;
    note: string;
    supervisorRating: number;
    tasks: TaskModel[];
  }

  export interface TaskModel {
    id: 0,
    taskName: string;
    isCompleted: boolean;
    taskDetail: {
      company_Id: number;
      project_Id:  number;
      taskDetailId: number;
      assigned_To:  number;
      assigned_By:  number;
      description: string;
     start_Date: string;
      end_Date: string;
     }
  }
   