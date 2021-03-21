import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  heroList: Observable<Hero[]> = new Observable;

  constructor(private hService: HeroService) {
    this.heroList = this.hService.getAll();
  }

  ngOnInit(): void {
  }

}
