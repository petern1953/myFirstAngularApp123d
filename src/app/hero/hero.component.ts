import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// ********** utólagos beszúrás
import { ActivatedRoute, RouterState } from '@angular/router';
// **********
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  heroList: Observable<Hero[]> = new Observable();

  constructor(
    private hService: HeroService,
    private router: Router,
    // ********** utólagos beszúrás
    route: ActivatedRoute
  ) // ********************
  {
    this.heroList = this.hService.getAll();
    // ********** utólagos beszúrás
    const state: RouterState = this.router.routerState;
    console.log('state: ', state);
    const root: ActivatedRoute = state.root;
    console.log('root: ', root);
    const child = root.firstChild;
    console.log('child: ', child);
    // innentől nem működik egyik sem
    // const id: Observable<string> = child?.params.forEach(p => p.id);
    // console.log("id: ", id);
    // const id: Observable<string> = route.params.map(p => p.id);
    // const url: Observable<string> = route.url.map(segments => segments.join(''));
    // const user = route.data.map(d => d.user);
    // **************
  }

  ngOnInit(): void {}

  jumpToHero(hero: Hero): void {
    this.router.navigateByUrl(`/hero/${hero.id}`);
  }
}
