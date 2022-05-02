import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private peli: any = { value: "", icon_url: "", id: "", url: "" };
  private peliculasUrl = "https://api.themoviedb.org/3/movie/550?api_key=def57bc234b846fded75699293aaec59"; // URL to web api


   APIURL:string = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=def57bc234b846fded75699293aaec59&page=1";
  IMGPATH = "https://image.tmdb.org/t/p/w1280";
  SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  constructor(private http: HttpClient) {}

  public getPelicula()  {
     let res = this.http.get(this.APIURL);
  return res;
  }
}
