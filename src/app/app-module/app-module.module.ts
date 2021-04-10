import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModuleRoutingModule } from './app-module-routing.module';
import {ContactAddComponent} from '../carreir-module/components/contact-add/contact-add.component'
import {ContactListComponent} from '../carreir-module/components/contact-list/contact-list.component'
import {ContactShowComponent} from '../carreir-module/components/contact-show/contact-show.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactAddComponent,
    ContactListComponent,
    ContactShowComponent,
  ],
  imports: [
    CommonModule,
    AppModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppModuleModule { }
