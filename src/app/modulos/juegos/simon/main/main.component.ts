import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'; 

import { botones } from 'src/app/clases/botones';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fade', [
      state('small', style({
        opacity: '0.1',
      })),
      state('large', style({
        opacity: '1',
      })),
      transition('small <=> large', animate(500))])]
})
export class MainComponent implements OnInit {

  colorBlock: Array<botones>;
  colorSeries: Array<number> = [];
  clickMulti: boolean = true; 
  
  constructor(public ServService: ServicioService) {
    this.ServService = ServService;
    this.colorBlock = ServService.colorBlock;
    this.colorSeries = ServService.colorSeries;
    this.ServService = ServService;
  }
  ngOnInit() {
  }

}
