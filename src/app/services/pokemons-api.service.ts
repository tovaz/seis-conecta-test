import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, retry, throwError } from 'rxjs';
import { environment as ENV } from "src/environments/environment";
import { pokemonInterface } from '../pokemons/clases/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsApiService {
  pokemons: Array<pokemonInterface> = [];
  pokemonTipos: any = [];

  constructor(private http: HttpClient) {
  }

  getPokemons(){
    return new Promise( (resolve, reject) => {
      this.http.get<pokemonInterface>(ENV.API_ROUTE + 'pokemon')
      .pipe(
        retry(3), //_ intentar 3 veces obtener la informacion
        catchError( (error, caugth) => { //_ rechazar la peticion
          reject(error);
          return throwError(() => new Error('A sucedido un error al obtener los pokemons.'));
        })
      )
      .subscribe( (response: any) => {
        this.pokemons = response;
        resolve(response)
      })
    });
  }

  getTipos() {
    return new Promise( (resolve, reject) => {
      this.http.get<pokemonInterface>('https://pokeapi.co/api/v2/type')
      .pipe(
        retry(3), //_ intentar 3 veces obtener la informacion
        catchError( (error, caugth) => { //_ rechazar la peticion
          reject(error);
          return throwError(() => new Error('A sucedido un error al obtener los pokemons.'));
        })
      )
      .subscribe( (response: any) => {
        this.pokemonTipos = response.results;
        resolve(response.results)
      })
    });
  }

  savePokemon(data: any){
    return new Promise( (resolve, reject) => {
      this.http.post(ENV.API_ROUTE + 'pokemon', data)
      .pipe(
        retry(3), //_ intentar 3 veces obtener la informacion
        catchError( (error, caugth) => { //_ rechazar la peticion
          reject(error);
          return throwError(() => new Error('A sucedido un error al obtener los pokemons.'));
        })
      )
      .subscribe( (response: any) => {
        this.pokemons.push(response);
        resolve(response)
      })
    });
  }
}
