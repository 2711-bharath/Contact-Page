import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    
    path: '',
    loadChildren: () => import('./app-module/app-module.module').then(m => m.AppModuleModule)
   },
   { path: '', redirectTo: '/home',  pathMatch: 'full' }

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
