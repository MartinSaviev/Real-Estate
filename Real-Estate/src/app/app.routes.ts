import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: "", component:HomePageComponent},
    {path: "register", component: RegisterComponent},
    {path: "login", component:LoginComponent}
];
