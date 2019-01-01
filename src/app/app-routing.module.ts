import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { GameComponent } from './game/game.component';
import { GameArticleComponent } from './game-article/game-article.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { GameResolve } from './services/game.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent },
  {
    path: 'games/:game', component: GameComponent,
    resolve: {
      game: GameResolve
    },
    children: [
      { path: 'articles/:article', component: GameArticleComponent, pathMatch: 'full' },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameResolve]
})
export class AppRoutingModule { }
