import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pokemonList: any[] = [];
  loading: boolean = false;
  ngOnInit() {
    const randomIds = this.generateRandomIds(905, 120);
    const requests = randomIds.map(id =>
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    forkJoin(requests).subscribe(pokemonList => {
      this.pokemonList = pokemonList.map(pokemon => ({
        ...pokemon,
        favorite: false // add a 'favorite' property to each pokemon object
      }));
    });
  }

  generateRandomIds(max: number, count: number): number[] {
    let randomIds: any[];
    randomIds = [];
    while (randomIds.length < count) {
      const id = Math.floor(Math.random() * max) + 1;
      if (!randomIds.includes(id)) {
        randomIds.push(id);
      }
    }
    randomIds.sort((a, b) => a - b)
    console.log(randomIds.toString())
    return randomIds;
  }
  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {
  }

}
