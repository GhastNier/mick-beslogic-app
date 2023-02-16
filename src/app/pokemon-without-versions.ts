import {
  NamedAPIResource,
  Pokemon,
  PokemonAbility,
  PokemonHeldItem, PokemonMove, PokemonPastType,
  PokemonSprites, PokemonStat, PokemonType,
  VersionGameIndex,
  VersionSprites
} from "pokenode-ts";

export interface PokemonWithoutVersions extends Omit<Pokemon, 'versions'>, Omit<PokemonSprites, any>, Omit<VersionSprites, any> {
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
  sprites: any;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonPastType[];
}
