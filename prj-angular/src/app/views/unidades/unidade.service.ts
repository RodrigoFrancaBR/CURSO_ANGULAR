import { Unidade } from './../../model/unidade';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';

const baseUrl = 'http://localhost:3001/unidades';

@Injectable({
  providedIn: 'root'
})

export class UnidadeService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService) { }

  salvarUnidade(unidade: Unidade): Observable<Unidade> {
    return this.http.post<Unidade>(baseUrl, unidade);
  }

  obterUnidades(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(baseUrl);
  }

  buscarUnidadePorId(id: number): Observable<any> {
    return this.http
      .get<any>(`${baseUrl}/${id}`)
      .pipe(tap(response => {
        this.log(`GET:${baseUrl}/${id}`, response);
        ToastrMensagemUtil.success(this.toastr, 'Unidade encontrada com sucesso!')
      }, error => {
        console.log('Error');
        ToastrMensagemUtil.error(this.toastr, `${error.status}`);
      }));
  }

  atualizaUnidade(id: number): Observable<Unidade> {
    const url = `${baseUrl} / ${id}`;
    return this.http.put<Unidade>(url, id);
  }

  log(operacao: string, resposta) {
    console.log(`${operacao} Status:${resposta.status} `);
  }

}
