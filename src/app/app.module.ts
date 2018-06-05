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
import { ValidatorService } from './services/validator.service';
import { RecordsService } from './services/records.service';
import { FileService } from './services/file.service';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { IntervalJsonToTimeStringPipe } from './pipes/interval-json-to-time-string.pipe';
import { GuideComponent } from './guide/guide.component';

export function getToken() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    IntervalJsonToTimeStringPipe,
    GuideComponent
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
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
