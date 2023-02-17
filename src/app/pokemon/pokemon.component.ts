import {Component, OnInit} from '@angular/core';
import {PokemonsService} from '../services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  fav: string = "./assets/pokeball.svg";

  get randomIds(): number[] {
    return this._randomIds;
  }

  set randomIds(value: number[]) {
    this._randomIds = value;
  }

  pokemonList: any[] = [];
  pokemon: any;
  favorite: boolean = false;
  private _randomIds: number[] = [];

  constructor(private pokemonService: PokemonsService) {
  }

  ngOnInit() {
    this.generateRandomIds(905, 5);
    console.log(this.randomIds.toString())

  }

  generateBasePokemon(ids: number[]) {
    ids.forEach(id => {
      this.pokemonService.getPokemon(id).subscribe(data => {
        if (data) {
          this.pokemonList.push(data)
        }
      })
    })
  }

  generateRandomIds(max: number, count: number): number[] {
    this._randomIds = [];
    while (this._randomIds.length < count) {
      const id = Math.floor(Math.random() * max) + 1;
      if (!this._randomIds.includes(id)) {
        this._randomIds.push(id);
      }
    }
    this._randomIds.sort((a, b) => a - b)
    this.generateBasePokemon(this._randomIds)
    return this._randomIds;
  }

  getPokemon(id: number) {
    this.pokemonService.getPokemon(id).subscribe(data => {
      if (data) {
        this.pokemon = data
      }
    })
  }

  updateFavorite(id: number, favorite: boolean) {
    this.pokemonService.updatePokemonFavorite(id, favorite).subscribe(data => {
      if (data) {
        this.pokemon = data;
        const updatedPkmn = this.pokemonList.find(p => p.id === id);
        if (updatedPkmn) {
          updatedPkmn.favorite = favorite
          console.log("Update:" + updatedPkmn.favorite + " \n ApiValue: " + favorite)
        }
      }
    })
  }

  isFavorite(id: number) {
    this.pokemonService.checkFavorite(id).subscribe(data => this.pokemon = data).unsubscribe()
    if (this.pokemon.favorite) {
      this.fav = "pokeball.svg"
    } else {
      this.fav = "pokeball_in.svg"
    }
    return this.pokemon
  }

  toggleFavorite(pokemon: any) {
    this.updateFavorite(pokemon.id, pokemon.favorite)
  }
}
