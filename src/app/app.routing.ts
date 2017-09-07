import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {SearchComponent} from './components/search/search.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileComponent} from './components/edit_profile/edit_profile.component';
import {AuthGuard} from './guards/auth.guard';
import {AddApartmentComponent} from './components/add-apartment/add-apartment.component';
import { ApartmentViewComponent } from './components/apartment-view/apartment-view.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'profile/:id/edit', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'addapartment', component: AddApartmentComponent, canActivate: [AuthGuard]},
  { path: 'apartment/:id', component: ApartmentViewComponent},

  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
