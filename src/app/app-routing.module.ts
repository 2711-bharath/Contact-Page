import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddpageComponent } from './addpage/addpage.component';

const routes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  {path:'home',component:HomeComponent},
  {path:'add',component:AddpageComponent},
  {path:'',redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
