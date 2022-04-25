import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  titulo = 'Sala de Juegos';
  estado_activo?:boolean;
  nombre_usuario?:string; 
  constructor(private authSv: AuthService, private router: Router) {  
    this.usuarioActual();
    console.log("estado: "+this.estado_activo);}

  
  ngOnInit(){
    this.usuarioActual();
  }

 
  async cerrarSesion(){
    try {
      await this.authSv.LogOut();
      this.router.navigate(['/login']).then(() => this.usuarioActual());
      
    } catch (error) {
      console.log("Error al cerrar sesion" + error);
    }
  } 

    usuarioActual() { 
      let usuario= this.authSv.getCurrentUserLS();
      if(usuario == null) {
      this.estado_activo =false;
      }
      else if(usuario!=null && usuario.sesion=="activa"){
        this.nombre_usuario= usuario.email;
        this.estado_activo =true;
      }
  }

}
