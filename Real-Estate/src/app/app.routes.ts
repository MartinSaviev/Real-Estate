import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewRealEstateComponent } from './components/add-new-real-estate/add-new-real-estate.component';

export const routes: Routes = [
    {path: "", component:HomePageComponent},
    {path: "register", component: RegisterComponent},
    {path: "login", component:LoginComponent},
    {path: "add-new-real-estate", component: AddNewRealEstateComponent}
];
