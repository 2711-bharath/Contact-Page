import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    
    path: '',
    loadChildren: () => import('./carreir-module/carreir-module.module').then(m => m.CarreirModuleModule)
   },

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
