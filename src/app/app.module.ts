import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';

import { UserService } from './services/user.service';
import { NewsService } from './services/news.service';
import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { ValidatorService } from './services/validator.service';
import { RecordsService } from './services/records.service';
import { FileService } from './services/file.service';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { IntervalJsonToTimeStringPipe } from './pipes/interval-json-to-time-string.pipe';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './not-found/not-found.component';

export function getToken() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    IntervalJsonToTimeStringPipe,
    GameComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    AuthGuard,
    UserService,
    NewsService,
    AuthService,
    ValidatorService,
    RecordsService,
    FileService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
