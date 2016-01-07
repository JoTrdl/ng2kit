import {Inject} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/share';

export class AuthService {
   private isAuth = false;
   private static lastNavigationAttempt = null;

   public observable:any;
   private observer: any;

   constructor(@Inject(Http) http) {
     this.observable = new Observable(observer => this.observer = observer).share();
   }

   /**
    * Authenticate username with passsword
    *
    * @param  {string} username Username
    * @param  {string} password Password
    * @return {Observable}
    */
   authenticate(username:string, password:string) {

     setTimeout(res => {
       this.isAuth = (username == 'ng@ng.com' && password == 'ng2')
       this.observer.next(this.isAuth)
     }, 250);

     return this.observable;
   }

   /**
    * Close the session
    *
    * @return {Observable}
    */
   logout() {
     // defer
     setTimeout(res => {
       this.isAuth = false;
       this.observer.next(this.isAuth);
     }, 0);

     return this.observable;
   }

   /**
    * Tell if session is authenticated
    *
    * @return {Boolean} True if yes, else false
    */
   isAuthenticated() {
     return this.isAuth;
   }

   /**
    * Set the last url
    *
    * @param  {String} attempt URL
    */
   setLastUrlAttempt(attempt) {
     console.log(attempt)
     AuthService.lastNavigationAttempt = attempt
   }

   /**
    * Get the last URL
    *
    * @return {String} The last URL attempt
    */
   getLastUrlAttempt() {
     console.log(AuthService.lastNavigationAttempt)
     return AuthService.lastNavigationAttempt || '/'
   }
}
