export class Usuario {

    nombre:string;
    email:string;
    clave:string;
    uid:string;
    
    constructor(uid:string, nombre:string, email:string, clave:string){
        this.nombre= nombre;
        this.email= email;
        this.clave= clave;
        this.uid= uid;
    }
}