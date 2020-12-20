import { UnidadesService } from './../../unidades/unidades.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Unidade } from 'src/app/model/unidade';
import { Injectable } from '@angular/core';

@Injectable(
    // {
    //   providedIn: 'root'
    // }
)
export class TurmaDetalheResolver implements Resolve<Observable<Array<Unidade>>>{

    constructor(private unidadeService: UnidadesService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    )
        : Observable<Array<Unidade>> {
        return this.unidadeService.bustarTodasUnidades();
    }

}