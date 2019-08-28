import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import * as config from '../../assets/resources/config.json';
import { Randomizer } from '../../../../common/models/randomizer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  private randomizer: Randomizer;
  private tabs: RandomizerTab[] = [
    { name: 'Overview', route: '' },
    { name: 'Articles', route: 'articles' },
  ];
  faGithub = faGithub;
  faDownload = faDownload;
  faExclamationTriangle = faExclamationTriangle;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.randomizer = this.route.snapshot.data.randomizer;

      if (!this.randomizer) {
        this.router.navigate(['/404']);
      }
    });
  }

  getRandomizer(): Randomizer {
    return this.randomizer;
  }

  getAuthorsString(): string {
    let str = '';
    const authors = this.randomizer.authors.map(author => author.name).sort();

    for (let i = 0; i < authors.length; i++) {
      if (i > 0)
        str += ' ';

      str += authors[i];

      if (i < authors.length - 1)
        str += ',';
    }

    return str;
  }

  getTabs(): any[] {
    return this.tabs;
  }

  get cdnUrl(): string {
    return config.cdnUrl;
  }

  get heroStyle() {
    return {
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("' + this.cdnUrl + 'games/banners/' + this.randomizer.game.banner + '")'
    }
  }
}

class RandomizerTab {
  name: string;
  route: string;
}
