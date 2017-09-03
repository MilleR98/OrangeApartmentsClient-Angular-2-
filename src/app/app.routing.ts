import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ProfileComponent} from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
