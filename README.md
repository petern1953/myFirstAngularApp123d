Http-kliens használata

file: app.module.ts

1. vegyük fel a HttpClientModule-t
a) import { HttpClientModule } from '@angular/common/http';
b) @NgModule imports: tömbben
    HttpClientModule,

2. saját http-szolgáltatást készítünk: footballService
ng g service service/football

3. football.service.ts-be:
a)
export class FootballService {
  jsonUrl: string =
    'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.clubs.json';

b) importáljuk és 

import { HttpClient } from '@angular/common/http';

c) beinjektáljuk a http-klienst:

  constructor(private http: HttpClient) {
    this.http.get(this.jsonUrl).subscribe(
      list => console.log('football list ', list),
      error => console.log(error),
      () => console.log('complete')
    );
  }

4. a service-t fell kell venni az app.module.ts-ben

import { FootballService } from './service/football.service';

providers: [ FootballService ],

6. app.component.ts-ben:
a) importáljuk és 

import { FootballService } from './service/football.service';

c) beinjektáljuk
  constructor( private fservice: FootballService ) {

----------------------------------------

CRUD megvalósítása saját json-állománnyal, json-szerverrel

----------------------------------------

1. json-server (globális) telepítése, ha még nincs:

npm i -g json-server

2. 
a) json-fájl létrehozása az assets mappa alá, majd a
b) heroes.json fájlba:
{
  "heroes": [
    {
      "id": 1,
      "name": "Lucy",
      "address": "Bp",
      "superpower": "biking"
    }, ... ]}

3. hero.service elkészítése:
ng g service service/hero

4. app.module.ts:
a) be kell importálni
import { HeroService } from './service/hero.service';

b) és elhelyezni a providers tömbben
  providers: [ FootballService, HeroService ],

5. a json-server elindítása:
json-server --watch ./src/assets/heroes.json

6. hero.ts:
hero.id felvétele a Hero osztályba

export class Hero {
  id?: number;

7. hero.service.ts:
a)
jsonUrl: string = 'http://localhost:3000/heroes';

b)
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';

c) getAll() metódus:
  constructor( private http: HttpClient ) { }
  
  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.jsonUrl)
  }

d) getOne(id) metódus, egy hero lekérése:

  getOne(id: string | number): Observable<Hero> {
    return this.http.get<Hero>(`${this.jsonUrl}/${id}`);
  }

e) add(hero) metódus, egy hero létrehozása:

  add(hero: Hero): Observable<any> {
    return this.http.post<Hero>(this.jsonUrl, hero);
  }

f) update(hero) metódus, hero módosítása:

  update(hero: Hero): Observable<any> {
    return this.http.patch<Hero>(`${this.jsonUrl}/${id}`, hero);
  }

g) remove(hero) metódus, egy hero törlése:

  remove(hero: any): Observable<any> {
    const id = hero.id ? hero.id : hero;
    return this.http.delete(`${this.jsonUrl}/${id}`);
  }
-------------------------
eddig volt az 123, 
az 3. Angular 2 plusz keretrendszer - Ajax és Angular,
mostantól az 123a
az Angular CRUD - alapvető adat-műveletek alapján
-------------------------
8. app.component.ts:
a)
import { HeroService } from './service/hero.service';
b)
constructor módosult
  constructor(
    private fservice: FootballService,
    private hservice: HeroService,
  ) {
    this.hservice.getAll()
      .forEach( value => console.log("All hero: ", value ) );

    this.hservice.getOne( 1 )
      .forEach( value => console.log("First hero: ", value) );

    this.hservice.add({ id: 2, name: "J", address: "Bp.", superpower: "drink" })
      .forEach( value => console.log("Added second hero: ", value) );

    this.hservice.update({ id: 1, name: "K", address: "Deb.", superpower: "d" })
      .forEach( value => console.log("Updated hero 1: ", value) );

    this.hservice.remove( 10 )
      .forEach( value => console.log("Deleted hero 10: ") );
  }

9. hero.service.ts-t módosítani kell (hero: any):
  remove(hero: any): Observable<any> {

10. a json-file-t a src-mappán kívülre kell mozgatni,
különben ciklikusan frissíti magát az alkalmazás
-------------------------
eddig volt az 123a, 
az 3. Angular 2 plusz keretrendszer - Ajax és Angular,
mostantól az 123b
az Angular Async - a beépített async pipe használata alapján
-------------------------
11. app.component.ts:
constructor átírva a listObservable-re

  constructor(
    private fservice: FootballService,
    private hservice: HeroService,
  ) {
    this.listObservable = this.hservice.getAll();
--
12. app.component.html:
async, *ngFor, *ngIf
<h2>List of Heroes</h2>
<ul>
  <li *ngFor="let hero of listObservable | async">
    <button class="btn btn-info">{{ hero.name }}  </button>
  </li>
</ul>
<h2>Hero details</h2>
<app-hero-detail *ngIf="myHero" [hero]="myHero"></app-hero-detail>
--
13. app.component.ts:
myHero kiürítése

  myHero: Hero = new Hero();
--
14. app.component.html:
gombra eseménykezelő

  <button (click)="setHero(hero)" class="btn btn-info">{{ hero.name }}  </button>

de így is működik, és nem kell átadni a .ts-nek:
  (click)="myHero = hero"
--
15. app.component.ts:
setHero metódus

  setHero(hero: Hero): void {
    this.myHero = hero;
  }
-------------------------
eddig volt az 123b, 
az 3. Angular 2 plusz keretrendszer - Ajax és Angular,
innentől az 123c
Angular Routing - útválasztás 1.
-------------------------
16. Bootstrap
index.html:

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
--
17. app.module.ts:
  kell ez, ha van app-routing.module.ts???

import { RouterModule, Routes } from '@angular/router';

  imports: [ ...
    RouterModule,
    Routes,
--
18. komponensek generálása a navigációhoz:
home, hero

ng g c home
ng g c hero
--
19. app-routing.module.ts:

import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
--
20. navigációs sáv

ng g c nav
--
21. nav.component.html:

a) b4-navbar-default Bootstrap navbar
b) kódot egyszerűsítjük, href-eket átírjuk
  routerLink="/"
  routerLink="/hero"
c) routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"

<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" routerLink="/">Karrier app</a>
  <div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a class="nav-link" routerLink="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a class="nav-link" routerLink="/hero">Heroes</a>
      </li>
    </ul>
  </div>
</nav>
--
22. app.component.html:

<app-nav></app-nav>
<router-outlet></router-outlet>
-------------------------
eddig volt az 123c, 
az 3. Angular 2 plusz keretrendszer - Ajax és Angular,
innentől az 123d
Angular Routing - útválasztás 2.
-------------------------
23. hero.component.ts: 
+
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

export class HeroComponent implements OnInit {
  heroList: Observable<Hero[]> = new Observable;

  constructor(private hService: HeroService) {
    this.heroList = this.hService.getAll();
  }
--
24. hero.component.html:

<div class="row">
  <div class="col-8 offset-2">
    <table class="table table-striped">
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
        <th>Superpower</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let hero of heroList | async">
          <td>{{hero.id}}</td>
          <td>{{hero.name}}</td>
          <td>{{hero.address}}</td>
          <td>{{hero.superpower}}</td>
          <td>
            <button (click)="jumpToHero(hero)" class="btn btn-info"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
--
25. hero.component.ts:

import { Router } from '@angular/router';

  constructor(
    private hService: HeroService,
    private router: Router

  jumpToHero(hero: Hero): void {
    this.router.navigateByUrl(`/hero/${hero.id}`);
  }
--
26. app-routing.module.ts:
+
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
...
  { path: 'hero/:id', component: HeroDetailComponent },
