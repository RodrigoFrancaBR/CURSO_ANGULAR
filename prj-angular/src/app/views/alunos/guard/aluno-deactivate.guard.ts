import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlunosDetalheComponent } from '../alunos-detalhe/alunos-detalhe.component';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';


@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class AlunoDeactivateGuard implements CanDeactivate<AlunosDetalheComponent> {

  constructor(private modalService: NgbModal) { }

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
