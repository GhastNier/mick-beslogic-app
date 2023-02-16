import {Component} from '@angular/core';
import {PokemonClient} from 'pokenode-ts';
import {PokemonWithoutVersions} from "../pokemon-without-versions";

@Component({
  selector: 'app-pokapi',
  templateUrl: './pokapi.component.html',
  styleUrls: ['./pokapi.component.css']
})
export class PokapiComponent {

  pokemon: PokemonWithoutVersions = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_types: [],
    species: {name: '', url: ''},
    sprites: {
      back_default: '',
      back_female: '',
      back_shiny: '',
      back_shiny_female: '',
      front_default: '',
      front_female: '',
      front_shiny: '',
      front_shiny_female: ''
    },
    stats: [],
    types: [],
    weight: 0
  };


  async byName(search: string) {
    const api = new PokemonClient();
    try {
      this.pokemon = await api.getPokemonByName(search);
      console.log(this.pokemon.name, this.pokemon.game_indices);
    } catch (error) {
      console.error(error);
    }
  }
}
