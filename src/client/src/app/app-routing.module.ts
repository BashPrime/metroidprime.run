import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { AllGamesResolve, SingleGameResolve } from './services/game.service';
import { AllGameArticlesResolve, OneGameArticleResolve } from './services/game-article.service';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { GameAllArticlesComponent } from './game-all-articles/game-all-articles.component';
import { GameArticleComponent } from './game-article/game-article.component';

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
        },
        children: [
          {
            path: '',
            component: GameOverviewComponent,
            pathMatch: 'full',
            resolve: {
              articles: AllGameArticlesResolve
            }
          },
          {
            path: 'articles',
            component: GameAllArticlesComponent,
            pathMatch: 'full',
            resolve: {
              articles: AllGameArticlesResolve
            }
          },
          {
            path: 'article/:article',
            component: GameArticleComponent,
            pathMatch: 'full',
            resolve: {
              article: OneGameArticleResolve
            }
          }
        ]
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
