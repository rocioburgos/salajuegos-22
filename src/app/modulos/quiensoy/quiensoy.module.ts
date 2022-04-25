import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuiensoyRoutingModule } from './quiensoy-routing.module';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';


@NgModule({
  declarations: [
    QuiensoyComponent
  ],
  imports: [
    CommonModule,
    QuiensoyRoutingModule
  ]
})
export class QuiensoyModule { }
