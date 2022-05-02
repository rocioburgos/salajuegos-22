import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  peliculas:Array<any>=[];
  baseUrl_img= 'https://image.tmdb.org/t/p/w1280'
  imgPath=''; 
  opcion_correcta?:string;
  opciones_incorrectas: Array<number>=[]
  aciertos=0;
  vidas=3;
  pelicula_elegida:any;
  mensaje='';
  respuesta_correcta:number=0;
  perdio= false;

  
  constructor(private peliSrv:PeliculaService ,
     private authSrv:AuthService,
     private jugadoresSrv:JugadoresService) { 
    this.mensaje='';
    this.peliSrv.getPelicula().subscribe(pelis =>{ 
    this.peliculas.push(pelis);
     this.peliculas = this.peliculas[0].results; 
    
    this.generarPregunta();
     
    }); 
  }

  ngOnInit(): void {
  }

  generarPregunta(){
    //elegir aleatorio del 0- 19
    this.pelicula_elegida = this.peliculas[Math.floor(Math.random() * this.peliculas.length)];
    this.imgPath= this.baseUrl_img+this.pelicula_elegida.poster_path;
    console.log(this.pelicula_elegida);

    this.opciones_incorrectas=[];
    this.opciones_incorrectas[this.respuesta_correcta]= this.pelicula_elegida.popularity;
    this.opciones_incorrectas.push( Math.floor(Math.random() * 15454545));
    this.opciones_incorrectas.push(Math.floor(Math.random() * 15454545));
    this.opciones_incorrectas.push(Math.floor(Math.random() * 15454545));
  }

  play(res:any){ 
    if(res == this.pelicula_elegida.popularity){ 
      this.aciertos++;
      this.mensaje='Bien!';
      this.generarPregunta();
      this.mensaje='';
    }else{ 
      this.vidas--; 
      if(this.vidas== 0){
        this.guardarResultado();
        this.perdio= true;
        this.mensaje= 'PERDIO :( . Su punjate fue: '+this.aciertos;
        
      }else{ 
        this.generarPregunta();
      }
    }  
  }


  guardarResultado(){ 
    let now = new Date();
    let fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear(); 
    let email = this.authSrv.getCurrentUserLS().email;
    let resultados = { 'email': email, 'fecha': fecha, 'juego': 'preguntados', 'puntaje': this.aciertos }
    this.jugadoresSrv.registrarResultados(resultados);
  }

  reload(){
    window.location.reload();
  }
}
