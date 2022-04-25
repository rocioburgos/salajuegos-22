import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from 'src/app/servicios/auth.service';
import { MensajeriaService } from 'src/app/servicios/mensajeria.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  remitente: string = '';
  destinatario: string = '';//el usuario Actual, depende de si estoy mandando o recibiendo mensajes
  fecha: string = '';
  hora: string = '';
  //mensajes?:Mensaje;
  mensaje: string = '';
  mensajeEnviar: string = '';
  usuario_actual:any;

  mensajes: Array<any> = [];
  constructor(private msjSrv: MensajeriaService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.mostrarRecientes();
    this.usuario_actual=this.authSrv.getCurrentUserLS();
    
  
  }
   

  mostrarRecientes() {
    this.msjSrv.traerMensajes().subscribe((data) => {

      this.mensajes = data;
      this.mensajes.sort();
 
      console.log(data);
    });
  }


  mandarMensaje() {
    try {
      let email = this.authSrv.getCurrentUserLS().email;
      if (this.mensajeEnviar != '' && this.mensajeEnviar != null && this.mensajeEnviar) {
        let mensaje: Mensaje = new Mensaje(email, this.mensajeEnviar, this.horario());
        this.msjSrv.nuevoMensaje(mensaje).then((res) => {
          this.mensajeEnviar = '';
        }).catch((err) => {
          console.log(err);
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  horario(): string {
    let date: Date = new Date();
    let fecha: string = date.getDate().toString() + '-' + date.getMonth().toString() + '-' + date.getFullYear().toString()
      + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString();
    return fecha;
  }
}
