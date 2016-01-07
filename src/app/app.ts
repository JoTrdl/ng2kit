
import {Router, Route, RouteConfig, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import {Component} from 'angular2/core';

import {Home} from './modules/home';
import {Login} from './modules/login';
import {Protected} from './modules/protected/protected';
import {AuthOutlet} from './services/authOutlet';

/**
 * App component.
 */
@Component({
  selector: 'app', // <app></app>
  templateUrl: 'app/app.html',
  directives: [ROUTER_DIRECTIVES, AuthOutlet]
})

/**
 * Routes configs
 */
@RouteConfig([
  new Route({path: '/home', component: Home, name: 'Home', useAsDefault: true}),
  new Route({path: '/protected', component: Protected, name: 'Protected', data: {protected: true}}),
  new Route({path: '/login', component: Login, name: 'Login'})
])


/**
 * App class definition.
 */
export class App {
  private logged:any = false;

  constructor(private router:Router) {

  }

}
