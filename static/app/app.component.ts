import { Component } from 'angular2/core';
import { HeroService }     from './hero.service';
import { ListHeroesComponent } from './list-heroes.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
  selector: 'my-app',
  template: `
      <h1>{{title}}</h1>
      <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
      </nav>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['./css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        HeroService
    ]
})
@RouteConfig([
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: ListHeroesComponent
    }
])
export class AppComponent {
  title = 'Tour of Heroes';
}