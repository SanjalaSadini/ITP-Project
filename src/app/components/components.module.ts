import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginPageComponent,
    DashboardComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
