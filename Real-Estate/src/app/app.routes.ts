import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewRealEstateComponent } from './components/add-new-real-estate/add-new-real-estate.component';
import { AllEstateComponent } from './components/all-estate/all-estate.component';
import { Error404Component } from './components/error404/error404.component';
import { EstateDetailsComponent } from './components/all-estate/estate-details/estate-details.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-new-real-estate', component: AddNewRealEstateComponent },
  {
    path: 'all-estate',
    children: [
      { path: '', component: AllEstateComponent },
      { path: ':all-estateId',component: EstateDetailsComponent },
    ],
  },
  { path: '**', component: Error404Component, pathMatch: 'full' },
];
