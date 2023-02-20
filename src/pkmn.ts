import {
  NamedAPIResource,
  PokemonAbility,
  PokemonHeldItem,
  PokemonMove,
  PokemonPastType,
  PokemonSprites,
  PokemonStat,
  PokemonType,
  VersionGameIndex
} from "pokenode-ts";

export interface Pkmn{
  abilities: PokemonAbility[];
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: PokemonPastType[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
  favorite:boolean;
}

