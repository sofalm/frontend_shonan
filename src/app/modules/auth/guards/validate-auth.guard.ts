import { AuthService } from './../services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


/**
 * Clase para manejar guards de la aplicacionn
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  /**
   * Constructor de la clase
   * @param user
   * @param route
   * @param StorageService
   */
  constructor(
    private authService: AuthService,
    private route: Router

  ) { }


  canActivate(): boolean {

    if (!localStorage.getItem("access_token")) {

      return true;
    }
    else {

      this.route.navigateByUrl("/panel/quote");
      return false;
    }

  }


  canLoad(): Observable<boolean> | boolean {


    if (!localStorage.getItem("access_token")) {

      return true;
    }
    else {

      this.route.navigateByUrl("/panel/quote");
      return false;
    }
  }
}
