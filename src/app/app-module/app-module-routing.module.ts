import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactAddComponent} from '../carreir-module/components/contact-add/contact-add.component'
import {ContactListComponent} from '../carreir-module/components/contact-list/contact-list.component'
import {ContactShowComponent} from '../carreir-module/components/contact-show/contact-show.component'
import { CommonModule } from '@angular/common';  

const routes: Routes = [
  

  {path: 'home', component: ContactListComponent,
    children: [{ path: ':id', component: ContactShowComponent }]
  
  },
    {path:'home',component:ContactListComponent},
  {path:'add',component:ContactAddComponent},
  {path:'add/:id',component:ContactAddComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class AppModuleRoutingModule { }
