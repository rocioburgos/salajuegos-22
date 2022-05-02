import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { FormsModule } from '@angular/forms'; 
import { PrincipalComponent } from './principal/principal.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ControlComponent } from './simon/control/control.component';
import { MainComponent } from './simon/main/main.component';


@NgModule({
  declarations: [
    MayormenorComponent,
    AhorcadoComponent,
    PrincipalComponent,
    PreguntadosComponent, 
    ControlComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule  ,
    JuegosRoutingModule,
    HttpClientModule
  ]
})
export class JuegosModule { }
