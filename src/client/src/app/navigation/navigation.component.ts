import { Component, OnInit } from '@angular/core';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private showNav: boolean = false;
  faDiscord = faDiscord;

  constructor() { }

  ngOnInit() {
  }

  getShowNav() {
    return this.showNav;
  }

  setShowNav(showNav: boolean) {
    this.showNav = showNav;
  }
}
