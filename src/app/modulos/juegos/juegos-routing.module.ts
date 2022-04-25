import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from 'src/app/guards/logueado.guard';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:'', component:PrincipalComponent },
   
  {path:'mayormenor', component: MayormenorComponent},
  {path:'ahorcado', component:AhorcadoComponent},
  { path: 'homejuegos', component: PrincipalComponent, pathMatch: 'full' },
  { path: '**', redirectTo:'homejuegos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
