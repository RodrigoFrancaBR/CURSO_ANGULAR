import { LoginService } from '../views/login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class CursoGuard implements CanActivate, CanLoad {

  constructor(private service: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log('canActivate');

    // if (this.service.usuarioEstaAutenticado()) {
    //   return true;
    // }

    // this.service.navigate(['/login']);
    // return false;

    return this.verificarAcesso();

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]):boolean | Observable<boolean> | Promise<boolean> {
    
      console.log('canLoad');

    return this.verificarAcesso();
    
  }

  private verificarAcesso() {
    if (this.service.usuarioEstaAutenticado()) {
      return true;
    }

    this.service.navigate(['/login']);
    return false;
  }

}
