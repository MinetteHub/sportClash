import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { BlogComponent } from './blog/blog.component';
import { AjoutReservationComponent } from './ajout-reservation/ajout-reservation.component';
import { MyhomeComponent } from './myhome/myhome.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'home', component: HomeComponent},
  { path : 'equipments', component: EquipmentsComponent},
  { path : 'blog', component: BlogComponent},
  { path : 'ajout-reservation', component: AjoutReservationComponent},
  { path : 'myhome', component: MyhomeComponent},
  { path : 'update-reservation/:id', component: UpdateReservationComponent},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
