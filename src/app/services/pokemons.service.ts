import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  constructor(private http: HttpClient) {
  }
  getPokemon(id: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${id}`);
  }
  initPokemon(page: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon?page=${page}`)
  }
  updatePokemonFavorite(id: number) {
    return this.http.put<any>(`http://localhost:3000/pokemon/${id}/isFav`, {});
  }
  checkFavorite(id: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${id}/fav`)
  }
}
