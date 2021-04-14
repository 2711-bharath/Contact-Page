import { NgModule } from '@angular/core';
import { CarreirModuleRoutingModule, ContactListComponent, ContactShowComponent, ContactAddComponent } from '../career-module'
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
