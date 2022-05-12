import { Component, OnInit } from '@angular/core';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-listado-resultado',
  templateUrl: './listado-resultado.component.html',
  styleUrls: ['./listado-resultado.component.css']
})
export class ListadoResultadoComponent implements OnInit {

  resultados:Array<any>=[];
  constructor(private jugadoresSrv:JugadoresService) { }

  ngOnInit(): void {
    this.jugadoresSrv.traerResultados().subscribe((data)=>{
      this.resultados = data;
    });
  }

}
