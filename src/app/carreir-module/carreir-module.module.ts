import { NgModule } from '@angular/core';

import { CarreirModuleRoutingModule } from './carreir-module-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactShowComponent } from './components/contact-show/contact-show.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import {AppComponent} from '../app.component'
import { NavigationComponent } from '../app-module/component/navigation/navigation.component'
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactAddComponent,
    ContactShowComponent,
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    CarreirModuleRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
  ]
})
export class CarreirModuleModule { }
