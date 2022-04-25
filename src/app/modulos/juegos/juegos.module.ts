import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { FormsModule } from '@angular/forms'; 
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
    MayormenorComponent,
    AhorcadoComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    FormsModule  ,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
