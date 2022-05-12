import { Component, OnInit } from '@angular/core'; 
import { Location } from '@angular/common';
import { Palabras } from 'src/app/clases/palabras';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service'; 

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {


  URL_IMAGENES_PRE = "assets/juegos/ahorcado/"
  URL_IMAGENES_EXT = ".jpg"

  juegoOn = true;
  juegoOff = !this.juegoOn;

  perdio!: boolean;
  gano!: boolean;
  palabraoculta: any;
  mascara = "";
  abecedario: Array<string> = [];
  vidas = 4;
  letrasUsadas = "";
  mensaje = "¿Qué desea hacer?";
  vidaImagen = this.URL_IMAGENES_PRE + "ahorcadoinicial" + this.URL_IMAGENES_EXT; //URL imagen cambiante durante los fallos en el juego
 
  interval: any;

  palabritas: Palabras = new Palabras(); // Instanciamos la clase palabras, donde hallamos las palabras para jugar

  selectedLetter: any;
  constructor(
    private _location: Location, 
    private jugadoresSrv: JugadoresService,
    private authSrv: AuthService
  ) {
    for (let letter = 0; letter < 26; letter++) {
      this.abecedario[letter] = String.fromCharCode(97 + letter)
    }
  }

  guardarResultados(){
    //guardar en firebase
    let now = new Date();
    let fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear(); 
    let email = this.authSrv.getCurrentUserLS().email;
    let letrasUsadas_count=  (this.letrasUsadas.length);
    let resultados = { 'email': email, 'fecha':fecha, 'juego': 'ahorcado', 'puntaje': this.vidas };
    this.jugadoresSrv.registrarResultados(resultados).then((res) => { 
    })
 }


  counter(i: number) {
    return new Array(i);
}
  letraElegida(obj: any) {
    this.selectedLetter = obj;
    this.game();
  }

  ngOnInit() {
    this.getPalabras(); 
  } 


  dibujarJuego(elegida: string) {
    this.palabraoculta = elegida;
    let temp = [...elegida];
    for (let i = 0; i < elegida.length; i++) {
      temp[i] = '-'
    }
    this.mascara = temp.join("");
  }


  // Metodo que rellena el array de letras utilizadas durante el juego

  letrasEmpleadas(selectedLetter: any) {
    let tempusadas = [...this.letrasUsadas];
    tempusadas[(tempusadas.length)] = selectedLetter + " ";
    this.letrasUsadas = tempusadas.join("");
  }


  game() {
    if (this.selectedLetter != null) {
      let selectedLetter = this.selectedLetter;
      let temp = [...this.mascara];  //Creamos una array temporal que recibe el valor actual de la palabra oculta  
      
      let contador = temp.length; //creamos una variable que nos sirve para evaluar. Tambien podemos usar un boolean

      for (let i = 0; i < temp.length; i++) { //Recorremos la mascara
        if (this.palabraoculta.charAt(i) == selectedLetter) { //Si la palabra elegida en el comboBox resulta que existe en el bucle, se ejecuta la acción
          temp[i] = selectedLetter; //sustituimos el valor de la posición del array temporal por la palabra elegida
          contador--;       //Indicamos que hemos encontrado un valor correcto, disminuyendo el contador para que sea distinto al valor original 
        }
      }
      if (contador == temp.length) { //Si el contador tiene un valor identico al original, significa que no hemos acertado letra, y por tanto perdemos vidas
        this.vidas--;
        this.lifes();
      }
      this.mascara = temp.join(""); // modificamos el valor de la mascara con el valor del array temporal, convirtiendolo en string por medio de join()
      this.letrasEmpleadas(selectedLetter);  //Insertamos la letra elegida en el array de letras empleadas

      if (this.mascara == this.palabraoculta) { //Si la palabra de la mascara coincide con la palabra oculta, significa que hemos ganado. ¡HURRA!       
        this.gameOver(); //En tal caso, ejecutariamos la función de fin de juego
      }
    }
  }


  //Metodo que contiene un switch que nos permite cambiar la imagen que se muestra durante el juego y determinar si el jugador ha perdido, por medio del contador de vidas. 

  lifes() {
    switch (this.vidas) {
      case 4:
        this.vidaImagen = this.URL_IMAGENES_PRE + "ahorcadoinicial" + this.URL_IMAGENES_EXT;
        break;
      case 3:
        this.vidaImagen = this.URL_IMAGENES_PRE + "ahorcadounfallo" + this.URL_IMAGENES_EXT;
        break;
      case 2:
        this.vidaImagen = this.URL_IMAGENES_PRE + "ahorcadodosfallos" + this.URL_IMAGENES_EXT;
        break;
      case 1:
        this.vidaImagen = this.URL_IMAGENES_PRE + "ahorcadotresfallos" + this.URL_IMAGENES_EXT;
        break;
      case 0:
        this.vidaImagen = this.URL_IMAGENES_PRE + "ahorcadocompleto" + this.URL_IMAGENES_EXT;
        this.gameOver();
        break;

    }
  }

  getPalabras() {
    var palabraElegida: string;

    //Numero aleatorio que usa la longitud de la consulta para elaborar una posicion en el array
    let words = this.palabritas.palabrasJuego;
    let aleatorio = (Math.floor(Math.random() * (words.length - 0 + 1)) + 0);

    palabraElegida = words[aleatorio];
    this.dibujarJuego(palabraElegida); //Al iniciar, ejecutamos el metodo dibujar      
    console.log(palabraElegida);
  }
  
  //Metodo que ejecutamos cuando el juego se termina, tanto si hemos perdido o ganado

  gameOver() {  
    
    let email = this.authSrv.getCurrentUserLS().email;
    let now = new Date();
    let fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear(); 
    this.juegoOn = false;
    this.juegoOff = !this.juegoOn
    if (this.vidas == 0) { //Evaluamos si hemos perdido por medio del marcador de vidas del jugador
      this.mascara = this.palabraoculta;
      //guardar en firebase
      let resultados = { 'email': email, 'fecha': fecha, 'juego': 'Ahorcado', 'puntaje': this.vidas }

      this.guardarResultados();
      

        this.mensaje = "HAS PERDIDO. EL JUEGO HA TERMINADO";
      
    } else {

      let resultados = { 'email': email, 'fecha': fecha, 'juego': 'Ahorcado', 'puntaje': this.vidas }
      this.guardarResultados();
       
        this.mensaje = "¡FELICIDADES! ¡HAS GANADO!"
 
      clearInterval(this.interval);
    }
  }

  //Metodo que nos permite recargar la página
  reload() {
    window.location.reload();
  }

  //Metodo que nos permite regresar atras

  backClicked() {
    this._location.back();
  }


}
