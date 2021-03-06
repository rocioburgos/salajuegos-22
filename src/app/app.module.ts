import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HomeComponent } from './componentes/home/home.component';
 

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   
import { NavbarComponent } from './modulos/navbar/navbar.component'; 
import { HttpClientModule } from '@angular/common/http';
import { ListadoResultadoComponent } from './modulos/listado-resultado/listado-resultado.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
 
    NavbarComponent,
       ListadoResultadoComponent,
       EncuestaComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule ,
    HttpClientModule,
    ReactiveFormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
