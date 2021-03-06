import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { EmployeeManagementComponent } from 'app/employee-management/employee-management.component';


export const AdminLayoutRoutes: Routes = [

    //  { path: '', children: [ { path: 'menuItem.path',component: DashboardComponent } ] },
     
    //  { path: '', children: [ { path: 'userprofile', component: UserProfileComponent } ] }, 

    //  { path: '', children: [ { path: 'employee', component: EmployeeManagementComponent } ] },

    // {  path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }


    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'employee-management',     component: EmployeeManagementComponent },
   
];
