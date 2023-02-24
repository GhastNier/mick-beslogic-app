import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  constructor(private http: HttpClient) {
  }
  getPokemon(natDex: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${natDex}`);
  }
  initPokemon(page: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon?page=${page}`)
  }
  updatePokemonFavorite(natDex: number) {
    return this.http.put<any>(`http://localhost:3000/pokemon/${natDex}/setFav`, {});
  }
  checkFavorite(natDex: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${natDex}/isFav`)
  }
}
