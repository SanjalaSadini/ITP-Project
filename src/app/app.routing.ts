import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent} from './user/sign-up/sign-up.component';

export const routes: Routes =[

  { path: 'adminLayout', component: AdminLayoutComponent,
  children: [{ path: 'adminLayout', component: AdminLayoutComponent }]
  },
  
  { path: 'signIn', component: SignInComponent,
    children: [{ path: 'signIn', component: SignInComponent }]  
  },

  { path: 'signup', component: SignUpComponent,
    children: [{ path: 'signup', component: SignUpComponent }]
  },
  
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: LandingComponent },
  
  


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
