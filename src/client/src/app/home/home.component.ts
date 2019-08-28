import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as config from '../../assets/resources/config.json';
import { Randomizer } from '../../../../common/models/randomizer.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cdnUrl: string = config.cdnUrl;
  randomizers: Randomizer[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.randomizers = this.route.snapshot.data.randomizers;
    });
  }

  get heroStyle() {
    return {
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("' + this.cdnUrl + 'home/home-banner.jpg")'
    };
  }
}
