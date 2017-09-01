import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {AppConfig} from './app.config';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from './services/alert.service';
import {routing} from './app.routing';
import {AlertComponent} from './components/directives/alert.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {HttpModule} from '@angular/http';
import {NavbarComponent} from './components/directives/navbar.component';
import {UserService} from './services/user.service';
import {SearchComponent} from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    NavbarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AppConfig,
    AuthGuard,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
