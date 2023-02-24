import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  Renderer2,
  QueryList
} from '@angular/core';
import {PokemonsService} from '../services/pokemons.service';
import {PokemonMain, Pokemons} from "../interfaces/pokemons";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, AfterViewInit {
  @ViewChildren('listItem') listItemsRef!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLUListElement>;
  pokemonsMain: PokemonMain[] = [];
  page = 1;
  isLoading = false;
  fav: string = "./assets/pokeball.svg";
  notFav: string = "./assets/pokeball_in.svg";

  favorite: boolean = false;

  constructor(private renderer: Renderer2, private pokemonService: PokemonsService) {
  }

  ngOnInit() {
    this.loadPokemon()

    const scrollContainerNative = this.scrollContainerRef.nativeElement;
    this.listItemsRef.forEach(itemRef => {
      const listItemNative = itemRef.nativeElement;
      console.log(listItemNative.textContent);
    });

    this.scrollContainerRef.nativeElement.addEventListener('scroll', () => {
      if (scrollContainerNative.scrollTop + scrollContainerNative.clientHeight >= scrollContainerNative.scrollHeight) {
        this.loadPokemon()
      }
    });
  }

  ngAfterViewInit() {
    if (this.scrollContainerRef === undefined) {
      console.error("The Scroll Container is not Initialized")
    // } else {
    //   console.log("This is the scroll container: " + this.scrollContainerRef)
    //   this.renderer.listen(scrollContainerNative, 'scroll', (event) => {
    //     this.loadPokemon()
    //   });
    }
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
      const index = this.pokemonsMain.findIndex(p => p.natDex === id);
      if (data) {
        this.pokemonsMain[index] = data
        this.pokemonsMain[index].favorite = data.favorite
      }
    })
  }

  updateFavorite(natDex: number) {
    this.pokemonService.updatePokemonFavorite(natDex).subscribe(updatedPokemon => {
      const index = this.pokemonsMain.findIndex(p => p.natDex === updatedPokemon.natDex);
      if (index !== -1) {
        this.pokemonsMain[index] = updatedPokemon;
        this.pokemonsMain[index].favorite = updatedPokemon.favorite;
      }
      this.getPokemon(natDex)
    });
  }

  // addScrollEventListener(scrollContainerNative: any): void {
  //   scrollContainerNative.addEventListener('scroll', () => {
  //     if (this.scrollContainer.nativeElement.scrollTop + this.scrollContainer.nativeElement.clientHeight >= this.scrollContainer.nativeElement.scrollHeight) {
  //       this.loadPokemon();
  //     }
  //   });
  // }
}
