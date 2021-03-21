import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from './model/hero';
import { FootballService } from './service/football.service';
import { HeroService } from './service/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Greeniland';
  myHero: Hero = new Hero();
  // {
  // name: 'Magneto',
  // address: 'New York',
  // superpower: 'hard'
  // };
  listObservable: Observable<any> = new Observable();

  constructor(
    private fservice: FootballService,
    private hservice: HeroService,
  ) {
    this.listObservable = this.hservice.getAll();
    // this.hservice.getAll()
    //   .forEach( value => console.log("All hero: ", value ) );

    // this.hservice.getOne( 1 )
    //   .forEach( value => console.log("First hero: ", value) );

    // this.hservice.add({ id: 2, name: "Jack", address: "Bp.", superpower: "drink" })
    //   .forEach( value => console.log("Added second hero: ", value) );

    // this.hservice.update({ id: 2, name: "Kris", address: "Deb.", superpower: "d" })
    //   .forEach( value => console.log("Updated hero 1: ", value) );

    // this.hservice.remove( 2 )
    //   .forEach( value => console.log("Deleted hero 2: ") );
  }

  setHero(hero: Hero): void {
    this.myHero = hero;
  }

}
