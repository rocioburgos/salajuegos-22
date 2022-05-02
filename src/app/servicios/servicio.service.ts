import { Injectable } from '@angular/core';
import { botones } from '../clases/botones';
import { AuthService } from './auth.service';
import { JugadoresService } from './jugadores.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  colorBlock: Array<botones> = [{ color: "red", animate: "large", audio: new Audio(), posicion:0 }, { color: "green", animate: "large", audio: new Audio(), posicion:1 }, { color: "yellow", animate: "large", audio: new Audio(), posicion:2 }, { color: "blue", animate: "large", audio: new Audio(), posicion:3 }]
  colorSeries: Array<number> = [];
  level: number = 0;
  index: number = 0;
  lastClicked: number=0;
  playerChoise: Array<number> = [];
  addLevelFlag: boolean = true;
  clickMulti: boolean = true;
  hideStartButton: boolean = true;
  playingAuth: boolean = false;
  failSound: any = new Audio();
  buttonClick: any = new Audio();
  timeWait: number = 1500;
  showLose: boolean = false;
  mensaje:string='';

  constructor(private jugadoresSrv:JugadoresService, private authSrv:AuthService) {
    this.loadSounds();
  }
  loadSounds(): void {
    let valores= Object.values(this.colorBlock); 

    valores.forEach(value => {
      console.log(value.audio)
      
      value.audio.src = `./../assets/juegos/simon/Audio/${value.posicion}.wav`;
      value.audio.load();
    })  

    this.failSound.src = `./../assets/juegos/simon/Audio/fail.mp3`;
    this.failSound.load()
    this.buttonClick.src = `./../assets/juegos/simon/Audio/button.mp3`;
    this.buttonClick.load();
  }

  runGame(): void {
    this.failSound.pause();
    this.hideStartButton = false, this.playingAuth = false;
    this.getNewIndex();
    setTimeout(() => {
      if (this.index < this.colorSeries.length) {
        this.animateMe(this.colorSeries[this.index]);
        this.index++;
        this.runGame();
      }
      else {
        this.playingAuth = true;
        this.index = 0;
        this.addLevelFlag = true;
      }
    }, this.timeWait)
  }

  animateMe(color: number): void {
    this.lastClicked ? this.colorBlock[this.lastClicked]['audio'].pause() : undefined;
    this.colorBlock[color]['audio'].play();
    this.colorBlock[color]['animate'] = "small";
    this.clickMulti = false;
    setTimeout(() => {
      this.lastClicked = color;
      this.colorBlock[color]['animate'] = "large";
      this.clickMulti = true;
    }, 500);
  }
  getNewIndex(): void {
    if (this.addLevelFlag) {
      this.colorSeries.push(Math.floor((Math.random() * 4) + 0));
      this.addLevelFlag = false;
      return
    }
  }

  addPlayerChoise(Choise: number): any {
    this.animateMe(Choise);
    this.playerChoise.push(Choise);
    this.checkChoisePath(Choise) ? (this.playerChoise.length == this.colorSeries.length) ? this.levelUp() : undefined : this.restLevel();
  }

  checkChoisePath(Choise: number): boolean {
    return (this.colorSeries[this.playerChoise.length - 1] == Choise);
  }

  restLevel() {
    
    this.mensaje='PERDIO. PUNTAJE: '+this.level;
    
    this.registrarResultado(this.level);
    this.colorSeries = [];
    this.playerChoise = [];
    this.hideStartButton = true;
    this.playingAuth = false;

    this.failSound.play();
    this.showLose = true;
    setTimeout(() => {
      this.showLose = false;
      this.mensaje='';
      this.level=0;
    }, 5000);


  }
  levelUp() {
    this.level++;
    this.playerChoise = [];
    this.timeWait -= 10;
    this.runGame();
  }


  registrarResultado(puntaje:any){
    //guardar en firebase
    let now = new Date();
    let fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear();
    let email = this.authSrv.getCurrentUserLS().email;
    let resultados = { 'email': email, 'fecha': fecha, 'juego': 'simon', 'puntaje': puntaje }
    this.jugadoresSrv.registrarResultados(resultados).then((res) => { 
    })
  }
}
