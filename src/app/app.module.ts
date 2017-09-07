import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {ImageUploadModule} from 'angular2-image-upload';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
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
import {SearchItemComponent} from './components/search/search-item.component';
import {SearchApartmentService} from './services/search-apartment.service';
import {ProfileComponent} from './components/profile/profile.component';
import {FooterComponent} from './components/directives/footer.component';
import {EditProfileComponent} from './components/edit_profile/edit_profile.component';
import {EqualValidator} from './components/directives/equal-validator.directive';
import {AddApartmentComponent} from './components/add-apartment/add-apartment.component';
import {ApartmentCreationService} from './services/apartment-creation.service';
import {ApartmentViewComponent} from './components/apartment-view/apartment-view.component';
import {MapComponent} from './components/map/map.component';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    NavbarComponent,
    SearchComponent,
    SearchItemComponent,
    ProfileComponent,
    FooterComponent,
    EditProfileComponent,
    EqualValidator,
    AddApartmentComponent,
    ApartmentViewComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFhd2I4LhTwtcctL6T8QCiR8eGurjqRek'
    })
  ],
  providers: [
    AuthService,
    AppConfig,
    AuthGuard,
    AlertService,
    UserService,
    SearchApartmentService,
    ApartmentCreationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
