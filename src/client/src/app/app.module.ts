import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { RandomizerArticleComponent } from './randomizer-article/randomizer-article.component';
import { RandomizerOverviewComponent } from './randomizer-overview/randomizer-overview.component';
import { RandomizerAllArticlesComponent } from './randomizer-all-articles/randomizer-all-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    RandomizerComponent,
    RandomizerArticleComponent,
    RandomizerOverviewComponent,
    RandomizerAllArticlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
