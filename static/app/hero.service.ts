import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';

import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HeroService {
    constructor (private http: Http) {}
    
    private _heroesUrl = 'http://localhost:8080/heroes';
    
    getHeroes() {
        return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json())
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }
    
    refreshHeroes() {
         return Observable
             .interval(5000)
             .switchMap(() => this.http.get(this._heroesUrl))
             .map((res : Response) => <Hero[]> res.json())
             .do(data => console.log(data))
             .catch(this.handleError);
    }
    
    getHero(id: number) {
        return this.http.get(this._heroesUrl + '/' + String(id))
                    .map(res => <Hero> res.json())
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }
    
    updateHero(hero : Hero) : Observable<Hero>{
        let body = JSON.stringify({id : hero.id, name: hero.name});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this._heroesUrl + '/update', body, options)
                    .map(res => <Hero> res.json())
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }
    
    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}