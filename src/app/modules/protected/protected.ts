import {Component} from 'angular2/core';

@Component({
  selector: 'protected',
  template: `
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <h1>Protected Component</h1>
      </div>
    </div>
  `
})

/**
 * Protected class definition.
 */
export class Protected {
  constructor() { }
}
