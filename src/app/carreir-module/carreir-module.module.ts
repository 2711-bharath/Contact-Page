import { NgModule } from '@angular/core';
import { CarreirModuleRoutingModule } from './carreir-module-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactShowComponent } from './components/contact-show/contact-show.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    ContactListComponent,
    ContactAddComponent,
    ContactShowComponent,
    
  ],

  imports: [
    CarreirModuleRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class CarreirModuleModule { }
