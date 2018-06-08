import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  filePrefix: string = '/assets/games/';
  gameName: string;
  gameData: any;
  constructor(private fileService: FileService, private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameName = params['game'];
      this.gameService.setGameName(this.gameName);
      const filePath = this.filePrefix + this.gameName + '/info.json';

      this.fileService.getLocalFile(filePath)
      .subscribe(data => {
        this.gameData = data;
        console.log(data);
      });
    });
  }

}
