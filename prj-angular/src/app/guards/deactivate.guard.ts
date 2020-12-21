import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanDeactivate } from './ican-deactivate';

@Injectable(
    // {
    //   providedIn: 'root'
    // }
)
export class DeactivateGuard implements CanDeactivate<ICanDeactivate> {

    constructor() { }

    canDeactivate(
        component: ICanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.podeDesativar()
            // return component.podeMudarRota()
            .then(() => {
                //clicou no confirm     
                return true;

            }, () => {
                // clicou no cancel ou no x 
                return false;
            });
    }
}