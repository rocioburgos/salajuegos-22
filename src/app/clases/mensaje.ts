import { Usuario } from "./usuario";

export class Mensaje {

    remitente:string;//email y nombre de quien mando el mensaje 
    mensaje:string;
    diaHora:string; 

    constructor(remitente:string,   mensaje: string, diaHora:string){
        this.remitente= remitente; 
        this.mensaje= mensaje;
        this.diaHora= diaHora;
    }
}