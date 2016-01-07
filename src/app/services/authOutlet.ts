import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

import {AuthService} from './authService';

@Directive({
  selector: 'router-outlet'
})

export class AuthOutlet extends RouterOutlet {

  private parentRouter:Router;

  constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
              _parentRouter:Router, @Attribute('name') nameAttr:string, private authService:AuthService) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
  }

  activate(instruction: ComponentInstruction) {

    if (instruction.routeData.get('protected') && !this.authService.isAuthenticated()) {
      this.authService.setLastUrlAttempt(instruction.urlPath)
      this.parentRouter.navigate(['/Login']);
      return;
    }

    return super.activate(instruction);
  }
}
