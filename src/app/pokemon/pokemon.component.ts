import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {PokemonsService} from '../services/pokemons.service';
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {Pokemon} from './pokemon.interface';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  fav: string = "./assets/pokeball.svg";
  notFav: string = "./assets/pokeball.svg";

  pokemonList: any[] = [];
  pokemons: Pokemon[]=[];
  favorite: boolean = false;
  private favoriteSubscription: Subscription | undefined;
  page = 1;
  isLoading = false;

  constructor(private http: HttpClient, private pokemonService: PokemonsService) {
    this.scrollContainer = new ElementRef(undefined);
  }

  ngOnInit(): void {
    this.loadPokemon();
    this.addScrollEventListener();
  }

  loadPokemon(): void {
    this.isLoading = true;
    this.pokemonService.getAllPokemon(1).subscribe(data => {
      this.pokemons.push(...data);
      this.page++;
      this.isLoading = false;
    });
  }

  addScrollEventListener(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      if (this.scrollContainer.nativeElement.scrollTop + this.scrollContainer.nativeElement.clientHeight >= this.scrollContainer.nativeElement.scrollHeight) {
        this.loadPokemon();
      }
    });
  }


  updateFavorite(id: number, favorite: boolean) {
    this.pokemonService.updatePokemonFavorite(id, favorite).subscribe(data => {
      if (data) {
        this.pokemons = this.pokemons.map(p => {
          if (p.id === id) {
            return {
              ...p,
              favorite: favorite
            };
          } else {
            return p;
          }
        });
        console.log(`Updated favorite for Pokemon with ID ${id} to ${favorite}`);
      }
    });
  }

  isFavorite(id: number): Observable<boolean> {
    return this.pokemonService.checkFavorite(id).pipe(
      map((res) => {
        return res.favorite;
      })
    );
  }
}
