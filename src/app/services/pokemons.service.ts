import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  constructor(private http: HttpClient) {
  }
  // Implement methods to get and update Pokemon
  getPokemon(id: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${id}`);
  }

  updatePokemonFavorite(id: number, currentFavorite: boolean) {
    const newFavorite = !currentFavorite
    return this.http.put<any>(`http://localhost:3000/pokemon/${id}/fav`, {favorite: newFavorite});
  }

  checkFavorite(id: number) {
    return this.http.get<any>(`http://localhost:3000/pokemon/${id}/fav`)
  }
}
