import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clave:string;
  email:string;
  show_error:boolean=false; //
  descripcion_error:string='';
  estado_activo?:boolean;
  nombre_usuario?:string; 

  constructor(
    private  authSrv: AuthService
    , private jugadoresSrv:JugadoresService
    ,private router: Router

  ) { 
    
    this.email= '';
    this.clave='';
  }

  ngOnInit(): void {
  }


  async loginUser(){
    try {
      const user=  await this.authSrv.loginUser(this.email, this.clave);
        if(user){
            this.jugadoresSrv.registrarNuevaSesion(this.email);
            localStorage.setItem('usuario_juegos', JSON.stringify ({'email': this.email,  'sesion':'activa'  }));
           // let retorno=  this.authSrv.getCurrentUserFirebase();
          //  console.log("RETORNO DEL USUARIO ACTUAL: "+retorno);
            this.router.navigate(['/home']).then(()=> this.usuarioActual());
        } 
    } catch (error) {

      this.show_error= true;
      this.descripcion_error='La clave o email no coinciden. Vuelva a intentar.'
      console.log(error);
    }
  
  }

  usuarioActual() { 
    let usuario= this.authSrv.getCurrentUserLS();
    if(usuario == null) {
    this.estado_activo =false;
    }
    else if(usuario!=null && usuario.sesion=="activa"){
      this.nombre_usuario= usuario.email;
      this.estado_activo =true;
    }
}


  autocompletar(){
    this.email='pepe@gmail.com';
    this.clave= '123456';
  }

}
