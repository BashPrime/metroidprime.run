import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { RandomizerOverviewComponent } from './randomizer-overview/randomizer-overview.component';
import { RandomizerArticleComponent } from './randomizer-article/randomizer-article.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { SingleRandomizerResolve } from './services/randomizer.service';
import { AllRandomizerArticlesResolve, OneRandomizerArticleResolve } from './services/randomizer-article.service';
import { RandomizerAllArticlesComponent } from './randomizer-all-articles/randomizer-all-articles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'randomizer/:randomizer',
    component: RandomizerComponent,
    resolve: {
      randomizer: SingleRandomizerResolve
    },
    children: [
      {
        path: '',
        component: RandomizerOverviewComponent,
        pathMatch: 'full',
        resolve: {
          articles: AllRandomizerArticlesResolve
        }
      },
      {
        path: 'articles',
        component: RandomizerAllArticlesComponent,
        pathMatch: 'full',
        resolve: {
          articles: AllRandomizerArticlesResolve
        }
      },
      {
        path: 'article/:article',
        component: RandomizerArticleComponent,
        pathMatch: 'full',
        resolve: {
          article: OneRandomizerArticleResolve
        }
      }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
