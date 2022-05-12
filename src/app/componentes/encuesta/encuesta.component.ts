import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  formulario:FormGroup;
  completarForm= true;
  mensaje:string='';
  constructor(private fb:FormBuilder, private jugadoresSrv:JugadoresService, private authSrv:AuthService, private router:Router) {
    this.formulario= fb.group({ 
      nombre: ['', [Validators.required] ],
      apellido: ['', [Validators.required]], 
      edad: ['',[Validators.required, Validators.min(18), Validators.max(99)]],
      tel: ['', [Validators.required,  Validators.pattern('^[0-9]*$'),  Validators.maxLength(10), Validators.minLength(10) ]],
      playAgain: ['', Validators.required],
      sugerencias: ['', [Validators.required , Validators.minLength(10)]],
      terminos: ['', Validators.required]
      
    });
   }

  ngOnInit(): void {
  }

  aceptar(){
 const form = this.formulario.value; 
    this.completarForm= false;
  let datos = {
    nombre: form.nombre,
    apellido: form.apellido ,
    edad: form.edad ,
    tel: form.tel ,
    playAgain: form.playAgain ,
    sugerencias: form.sugerencias ,
    email: this.authSrv.getCurrentUserLS().email }

   this.jugadoresSrv.registrarEncuesta(datos).then((res)=>{
      this.mensaje = 'Gracias por participar de la encuesta!';
      this.router.navigate(['']);
    });  
  }
}
