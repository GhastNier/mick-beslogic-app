import {
  NamedAPIResource,
  PokemonAbility,
  PokemonHeldItem,
  PokemonMove, PokemonPastType,
  PokemonSprites, PokemonStat, PokemonType,
  VersionGameIndex
} from "pokenode-ts";

export interface Pokemon {
  id: number;

  name: string;

  base_experience: number;

  height: number;

  is_default: boolean;

  order: number;

  weight: number;

  abilities: PokemonAbility[];

  forms: NamedAPIResource[];

  game_indices: VersionGameIndex[];

  held_items: PokemonHeldItem[];

  location_area_encounters: string;

  moves: PokemonMove[];
  sprites: PokemonSprites;

  species: NamedAPIResource;

  stats: PokemonStat[];

  types: PokemonType[];

  past_types: PokemonPastType[];
  favorite: boolean;
}
