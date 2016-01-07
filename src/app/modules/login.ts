import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {AuthService} from '../services/authService';

@Component({
  selector: 'login',
  template: `
    <div class="mdl-layout login">
      <div class="mdl-grid ">

        <div class="mdl-cell mdl-cell--5-col mdl-cell--middle">
          <form (submit)="login($event, username.value, password.value)" >
            <div class="mdl-card mdl-shadow--2dp">
              <div class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Login</h2>
              </div>
              <div class="mdl-card__supporting-text">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" #username required>
                  <label class="mdl-textfield__label" for="username">Username</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="password" #password required>
                  <label class="mdl-textfield__label" for="password">Password</label>
                </div>
                <p>Tip: ng@ng.com / ng2</p>
                <p *ngIf="error" class="mdl-color-text--red">Sorry, authentication refused.</p>
              </div>
              <div class="mdl-card__actions mdl-card--border">
                <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  `
})

/**
 * Login class definition.
 */
export class Login {

  private error = false

  constructor(private router:Router, private authService:AuthService) {

  }

  ngAfterViewInit() {
    var Material = require('exports?componentHandler!material-design-lite/material.min.js');
    Material.upgradeDom();
  }

  /**
   * Performs login
   *
   * @param  {[type]} event    [description]
   * @param  {[type]} username [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  login(event, username, password) {
    var self = this;
    event.preventDefault();

    this.authService.authenticate(username, password).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigateByUrl(this.authService.getLastUrlAttempt());
      } else {
        this.error = true; // show login error message
      }
    });
  }
}
