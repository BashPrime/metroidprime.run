import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = (new Date()).getFullYear();
  faGithub = faGithub;
  faDiscord = faDiscord;

  constructor() { }

  ngOnInit() {
  }

}
