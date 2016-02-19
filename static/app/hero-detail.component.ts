import { Component, OnInit } from 'angular2/core';
import {Hero} from './hero';
import {RouteParams} from 'angular2/router';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './templates/hero-detail.component.html',
    styleUrls: ['./css/hero-detail.component.css']
})

export class HeroDetailComponent {
    hero: Hero;
    errorMessage: string;
    
    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams) {
    }
    
    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._heroService.getHero(id)
            .subscribe(
                hero => this.hero = hero,
                error =>  this.errorMessage = <any>error);
    }
    
    updateHero() {
        this._heroService.updateHero(this.hero)
            .subscribe(
                hero => this.hero = hero,
                error =>  this.errorMessage = <any>error);
    }
    
    goBack() {
        window.history.back();
    }
}