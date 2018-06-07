import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { FileService } from '../services/file.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  game: string;
  guidename: string;
  content: any;
  constructor(private route: ActivatedRoute, private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      console.log(params);
      this.game = params['game'];
      this.guidename = params['guidename'];

      const fileName = '/assets/guides/' + this.game + '/' + this.guidename + '.html';

      this.fileService.getLocalFileAsString(fileName)
      .subscribe(data => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(data);
      });
    });
  }

}
