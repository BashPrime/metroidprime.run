import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { GameComponent } from './game/game.component';
import { GameArticleComponent } from './game-article/game-article.component';
import { GameArticleMenuComponent } from './game-article/game-article-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { GameResolve, GameArticlesResolve, GameSingleArticleResolve, GameArticleCategoriesResolve, GameEditArticleResolve } from './services/game.service';
import { GameArticleEditComponent } from './game-article/game-article-edit.component';
import { PermissionGuard } from './guards/permission.guard';

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
      {
        path: 'articles',
        component: GameArticleMenuComponent,
        resolve: {
          articles: GameArticlesResolve
        },
        children: [
          {
            path: ':article',
            component: GameArticleComponent,
            pathMatch: 'full',
            resolve: {
              article: GameSingleArticleResolve
            }
          }
        ]
      },
      {
        path: 'create-article',
        component: GameArticleEditComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permissions: {
            gameBased: true,
            keys: [
              'game.createArticle'
            ]
          }
        },
        resolve: {
          categories: GameArticleCategoriesResolve
        }
      },
      {
        path: 'edit-article/:article',
        component: GameArticleEditComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          isEdit: true,
          permissions: {
            gameBased: true,
            keys: [
              'game.updateArticle'
            ]
          }
        },
        resolve: {
          article: GameEditArticleResolve,
          categories: GameArticleCategoriesResolve
        }
      }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameResolve, GameArticlesResolve, GameSingleArticleResolve, GameArticleCategoriesResolve, GameEditArticleResolve]
})
export class AppRoutingModule { }
