import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
// import { RandomizerOverviewComponent } from './randomizer-overview/randomizer-overview.component';
// import { RandomizerArticleComponent } from './randomizer-article/randomizer-article.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { AllGamesResolve, SingleGameResolve } from './services/game.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: BaseComponent,
    resolve: {
      games: AllGamesResolve
    },
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'game/:game',
        component: GameComponent,
        resolve: {
          game: SingleGameResolve
        }
      },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
