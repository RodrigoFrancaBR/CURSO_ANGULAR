import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { AlunosDetalheComponent } from '../alunos-detalhe/alunos-detalhe.component';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class AlunoDeactivateGuard implements CanDeactivate<AlunosDetalheComponent> {

  constructor() { }

  canDeactivate(
    component: AlunosDetalheComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.podeMudarRota()
      .then(() => {
        //clicou no confirm     
        return true;

      }, () => {
        // clicou no cancel ou no x 
        return false;
      });
  }


}
