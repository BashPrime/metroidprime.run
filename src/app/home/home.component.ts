import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestRecords: object[] = [];
  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.getLatestRecords().subscribe(
      res => {
        if (res['success']) {
          this.latestRecords = res['data'];
        }
      },
      err => {
      }
    );
  }

}
