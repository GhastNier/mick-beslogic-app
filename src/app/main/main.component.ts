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

  ngOnInit() {
    const randomIds = this.generateRandomIds(905, 120);
    const requests = randomIds.map(id =>
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    forkJoin(requests).subscribe(pokemonList => {
      this.pokemonList = pokemonList;
      console.log(this.pokemonList.at(0).name);
      console.log(this.pokemonList.at(1).name);
      console.log(this.pokemonList.at(2).name);
      console.log(this.pokemonList.at(3).name);
      console.log(this.pokemonList.at(4).name);
      console.log(this.pokemonList.at(5).name);
      console.log(this.pokemonList.at(6).name);
      console.log(this.pokemonList.at(7).name);
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
    randomIds.sort((a,b)=>a-b)
    console.log(randomIds.toString())
    return randomIds;
  }

  loading: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {
  }
}
