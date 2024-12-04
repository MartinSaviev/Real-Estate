import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewRealEstateComponent } from './components/add-new-real-estate/add-new-real-estate.component';
import { AllEstateComponent } from './components/all-estate/all-estate.component';
import { Error404Component } from './components/error404/error404.component';
import { EstateDetailsComponent } from './components/all-estate/estate-details/estate-details.component';
import { MyEstateComponent } from './components/my-estate/my-estate.component';
import { EditComponent } from './components/all-estate/estate-details/edit/edit.component';
import { CommentsComponent } from './components/all-estate/comments/comments.component';
import {
  isAuthenticated,
  isNotAuthenticated,
  isOwner,
} from './components/auth/authGuards';
import { EditCommentComponent } from './components/all-estate/comments/edit-comment/edit-comment.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isAuthenticated],
  },
  { path: 'login', component: LoginComponent, canActivate: [isAuthenticated] },
  {
    path: 'add-new-real-estate',
    component: AddNewRealEstateComponent,
    canActivate: [isNotAuthenticated],
  },
  {
    path: 'all-estate',
    children: [
      { path: '', component: AllEstateComponent },
      { path: ':estateId/details', component: EstateDetailsComponent },
    ],
  },
  {
    path: 'my-estate',
    children: [
      {
        path: '',
        component: MyEstateComponent,
        canActivate: [isNotAuthenticated],
      },
      { path: ':estateId/details', component: EstateDetailsComponent },
    ],
  },
  {
    path: 'details/:estateId/edit',
    component: EditComponent,
    canActivate: [isOwner],
  },
  { path: 'details/:estateId/comments', component: CommentsComponent },
  { path: 'details/:estateId/comments/:commentId', component: EditCommentComponent },
  { path: '**', component: Error404Component, pathMatch: 'full' },
];
