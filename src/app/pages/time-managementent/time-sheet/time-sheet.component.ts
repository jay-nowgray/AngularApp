import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  sortAsc: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  sort() {
       this.sortAsc = !this.sortAsc;
  }
}
