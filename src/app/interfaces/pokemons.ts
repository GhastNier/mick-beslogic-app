import {PokemonAbility} from "./abilities";
import {items, moves, NamedAPIResource, VersionGameIndex} from "./named-api-resources";
import PokemonHeldItem = items.PokemonHeldItem;
import PokemonMove = moves.PokemonMove;
import {VersionSprites} from "./versionSprites";
import PokemonSprites = VersionSprites.PokemonSprites;
import {Statistics, Typing} from "./statistics";
import PokemonStat = Statistics.PokemonStat;
import PokemonType = Typing.PokemonType;
import PokemonPastType = Typing.PokemonPastType;

export interface Pokemons {
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
export interface PokemonMain{
  _id: number,
  height: number,
  id: number,
  name: string,
  sprite: string,
  weight: number,
  favorite: boolean,
}
