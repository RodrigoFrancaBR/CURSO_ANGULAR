import { TurmasService } from '../turmas.service';
import { LoginService } from '../../login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class TurmaGuard implements CanActivateChild {

  constructor(
    private service: TurmasService) {
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log('TurmaGuard');

    if (state.url.includes('novo')) {
      return this.service.temPermissaoParaIncluir();
    }

    return true;

  }

}
