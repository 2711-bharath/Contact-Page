import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactShowComponent} from './components/contact-show/contact-show.component'
import {ContactListComponent} from './components/contact-list/contact-list.component'
import {ContactAddComponent} from './components/contact-add/contact-add.component'

import { CommonModule } from '@angular/common';  

const routes: Routes = [
  { path: '', redirectTo: '/home',  pathMatch: 'full' },
  {path: 'home', component: ContactListComponent,
    children: [{ path: ':id', component: ContactShowComponent }]
  },
  {path:'add',component:ContactAddComponent},
  {path:'home/edit/:id',component:ContactAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class CarreirModuleRoutingModule { }
