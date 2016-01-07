/*
 * Angular Providers
 */
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {APP_SERVICES} from './app/services/services';

/*
 * App component
 */
import {App} from './app/app.ts';

/**
 *  Custom style
 */
require('./theme/app.scss');

/*
 * Bootstrap the Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
function main() {
  return bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    APP_SERVICES
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', function() {

  // Init Material
  setTimeout(function() {
    var Material = require('exports?componentHandler!material-design-lite/material.min.js');
    Material.upgradeDom();
  }, 0);

  // Init Angular app
  main();
});
