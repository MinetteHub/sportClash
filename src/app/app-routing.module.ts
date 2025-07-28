import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { BlogComponent } from './blog/blog.component';
import { AjoutReservationComponent } from './ajout-reservation/ajout-reservation.component';
import { MyhomeComponent } from './myhome/myhome.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { EventsclubComponent } from './eventsclub/eventsclub.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'home', component: HomeComponent},
  {path :'events', component: EventsclubComponent},
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reclamation', component: ReclamationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
  
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
