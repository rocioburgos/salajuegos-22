import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  clave:string;
  nombre:string;
  email:string;

  show_error:boolean=false; //
  descripcion_error:string='';
 
  constructor(
    private router:Router
    ,private authSrv:AuthService 
    ,private jugadoresSrv:JugadoresService
    ) {  
    this.clave='';
    this.nombre='';
    this.email='';
  }

  ngOnInit(): void {
  }
 async onRegistro(){
   try {
      const user= await this.authSrv.registerUser(this.email, this.clave);
    
     if(user){ 
 
      let uid='';
      let usuario= new Usuario( uid, this.nombre, this.email, this.clave);
     // this.jugadoresSrv.registrarNuevoJugador(usuario);
      this.jugadoresSrv.registrarNuevaSesion(this.email); 
      localStorage.setItem('usuario_juegos', JSON.stringify ({'email': this.email,  'sesion':'activa'  }));


    
      this.router.navigate(['/home']);
    } 

    } catch (error) {
 
      this.show_error= true;
      this.descripcion_error='Error al registrar el usuario. Vuelva a intentar.'
      console.log(error);
    }
  
  } 

}
