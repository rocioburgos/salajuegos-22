import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { HomeComponent } from './componentes/home/home.component'; 
import { LogueadoGuard } from './guards/logueado.guard';
import { ListadoResultadoComponent } from './modulos/listado-resultado/listado-resultado.component';

const routes: Routes = [
 
  {
    path:'login',
    loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) 
  },
  {
    path:'registro',
    loadChildren: () => import('./modulos/registro/registro.module').then(m => m.RegistroModule) 
  },
  {
    path:'home',
    component:HomeComponent
  }, 
  {
    path:'quiensoy',
    loadChildren: () => import('./modulos/quiensoy/quiensoy.module').then(m => m.QuiensoyModule) 
  },
  {
    path: 'chat',
    loadChildren: () => import('./modulos/chat/chat.module').then(m => m.ChatModule) 
    
  },
  {
    path:'juegos',
    loadChildren: ()=>import('./modulos/juegos/juegos.module').then(m=>m.JuegosModule)
  },
  {
    path: 'listado',
   component: ListadoResultadoComponent
  }, 
  {
    path: 'encuesta',
    component: EncuestaComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
