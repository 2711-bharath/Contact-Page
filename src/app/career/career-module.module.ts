import { NgModule } from '@angular/core';
import { CarreirModuleRoutingModule, ContactListComponent, ContactShowComponent, ContactAddComponent } from '.'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';  
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    NgxSkeletonLoaderModule,
  ]
})
export class CarreirModuleModule { }
