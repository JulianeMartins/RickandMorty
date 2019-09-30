import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { CharacterComponent } from './components/character/character.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'locations/:id',
    component: LocationComponent
  },
  {
    path: 'characters/:id',
    component: CharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
