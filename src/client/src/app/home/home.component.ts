import { Component, OnInit } from '@angular/core';

import * as config from '../../assets/resources/config.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cdnUrl: string = config.cdnUrl;
  worldRecords: WorldRecord[] = [
    {
      gameTitle: 'Metroid Prime',
      runner: 'T3',
      time: '0:49 (IGT)',
      video: 'https://www.youtube.com/watch?v=1p3jBuvu0Ao',
      gameAbbreviation: 'prime',
    },
    {
      gameTitle: 'Metroid Prime 2: Echoes',
      runner: 'LivingCircuitry',
      time: '0:53 (IGT)',
      video: 'https://www.youtube.com/watch?v=n5nYdYIotoM',
      gameAbbreviation: 'echoes',
    },
    {
      gameTitle: 'Metroid Prime 3: Corruption',
      runner: 'Claris',
      time: '1:46:52 (IGT)',
      video: 'https://www.youtube.com/watch?v=2u-7mZO69E8',
      gameAbbreviation: 'corruption'
    },
    {
      gameTitle: 'Metroid Prime Hunters',
      runner: 'Dann_1',
      time: '1:01:23 (IGT)',
      video: 'https://www.youtube.com/watch?v=QVqHcRCg6Lg',
      gameAbbreviation: 'hunters'
    },
    {
      gameTitle: 'Metroid Prime Pinball',
      runner: 'UchihaMadao',
      time: '17:37',
      video: 'https://www.youtube.com/watch?v=cZ5-A_3MWzQ',
      gameAbbreviation: 'pinball'
    },
    {
      gameTitle: 'Metroid Prime: Federation Force',
      runner: 'kirbyellowkine',
      time: '2:16:59',
      video: 'https://www.youtube.com/watch?v=7w7y51lvick',
      gameAbbreviation: 'federationforce'
    }
  ]

  constructor() { }

  ngOnInit() {}

  get heroStyle() {
    return {
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("' + this.cdnUrl + 'home/home-banner.jpg")'
    };
  }

  getLinkText(link: string): string {
    const lowerCase = link.toLowerCase();
    if (lowerCase.includes('youtube')) {
      return 'YouTube';
    }
    else if (lowerCase.includes('twitch')) {
      return 'Twitch';
    }

    return 'Video';
  }
}

interface WorldRecord {
  gameTitle: string;
  runner: string;
  time: string;
  video: string;
  gameAbbreviation: string;
}