import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PrincipalComponent } from './principal/principal.component';
import { MainComponent } from './simon/main/main.component';

const routes: Routes = [
  {path:'', component:PrincipalComponent },
   
  {path:'mayormenor', component: MayormenorComponent},
  {path:'ahorcado', component:AhorcadoComponent},
  {
    path: 'preguntados',
    component: PreguntadosComponent 

  },
  {
    path: 'simon',
    component: MainComponent 
  },
  { path: 'homejuegos', component: PrincipalComponent, pathMatch: 'full' },

  { path: '**', redirectTo:'homejuegos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
