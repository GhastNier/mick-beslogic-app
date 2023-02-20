import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PokemonsService} from '../services/pokemons.service';
import {PokemonMain, Pokemons} from "../interfaces/pokemons";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  pokemons: Pokemons[] = [];
  pokemonsMain: PokemonMain[] = [];
  page = 1;
  isLoading = false;

  fav: string = "./assets/pokeball.svg";
  notFav: string = "./assets/pokeball_in.svg";

  favorite: boolean = false;


  constructor(private pokemonService: PokemonsService) {
  }

  ngOnInit() {
    this.loadPokemon()
  }

  ngAfterViewInit() {
    setTimeout(() => this.addScrollEventListener(), 0);
  }

  loadPokemon(): void {
    this.isLoading = true;
    this.pokemonService.initPokemon(this.page).subscribe(data => {
      this.pokemonsMain.push(...data);
      this.page++;
      this.isLoading = false;
    });
  }

  getPokemon(id: number) {
    this.pokemonService.getPokemon(id).subscribe(data => {
      const index = this.pokemonsMain.findIndex(p => p.id === id);
      if (data) {
        this.pokemonsMain[index] = data
        this.pokemonsMain[index].favorite = data.favorite
      }
    })
  }

  updateFavorite(id: number) {
    this.pokemonService.updatePokemonFavorite(id).subscribe(updatedPokemon => {
      const index = this.pokemonsMain.findIndex(p => p.id === updatedPokemon.id);
      if (index !== -1) {
        this.pokemonsMain[index] = updatedPokemon;
        this.pokemonsMain[index].favorite = updatedPokemon.favorite;
      }
      this.getPokemon(id)
    });
  }

  addScrollEventListener(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      if (this.scrollContainer.nativeElement.scrollTop + this.scrollContainer.nativeElement.clientHeight >= this.scrollContainer.nativeElement.scrollHeight) {
        this.loadPokemon();
      }
    });
  }
}
