import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { FileService } from '../services/file.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit, OnDestroy {
  guideType: string;
  gameName: string;
  gameNameSubscription: any;
  guideName: string;
  content: any;
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private gameService: GameService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.guideType = params['guidetype'];
      this.guideName = params['guidename'];
      this.gameNameSubscription = this.gameService.gameName$.subscribe(gameName => {
        this.gameName = gameName;
        const fileName = '/assets/guides/' + this.gameName + '/' + this.guideType + '/' + this.guideName + '.html';

        this.fileService.getLocalFileAsString(fileName).subscribe(data => {
          this.content = this.sanitizer.bypassSecurityTrustHtml(data);
        });
      });
    });
  }

  ngOnDestroy() {
    this.gameNameSubscription.unsubscribe();
  }

}
