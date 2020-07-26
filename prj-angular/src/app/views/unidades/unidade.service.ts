import { Unidade } from 'src/app/model/unidade';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';

/*Integração com json server
  const baseUrl = 'http://localhost:3001/unidades';
*/
const baseUrl = 'api/unidades';

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

  bustarTodasUnidades(): Observable<Array<Unidade>> {
    return this.http.get<Array<Unidade>>(baseUrl);
  }

  buscarUnidadePorId(id: number) {
    console.log(`GET:${baseUrl}/${id}`);
    return this.http
      .get(`${baseUrl}/${id}`, { observe: 'response' })
      .pipe(tap((response) => {
        console.log(response);
        ToastrMensagemUtil.tratarSuccces(this.toastr, response.status);
        // ToastrMensagemUtil.success(this.toastr, 'Unidade encontrada com sucesso!');
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        ToastrMensagemUtil.tratarError(this.toastr, httpErrorResponse.status);
      }));
  }

  // buscarUnidadePorId(id: number): Observable<Unidade> {
  //   console.log(`GET:${baseUrl}/${id}`);
  //   return this.http
  //     .get<Unidade>(`${baseUrl}/${id}`)
  //     .pipe(tap((unidade: Unidade) => {
  //       console.log(unidade);
  //       ToastrMensagemUtil.success(this.toastr, 'Unidade encontrada com sucesso!');
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       console.log(httpErrorResponse);
  //       // msg vindo do back
  //       ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
  //       // ToastrMensagemUtil.tratarMensagem(this.toastr, httpErrorResponse.status);
  //     }));
  // }

  atualizaUnidade(id: number): Observable<Unidade> {
    const url = `${baseUrl} / ${id}`;
    return this.http.put<Unidade>(url, id);
  }

  excluirUnidade(id: number) {
    return this.http
      .delete<Unidade>(`${baseUrl}/${id}`)
      .pipe(tap(response => {
        ToastrMensagemUtil.success(this.toastr, 'Unidade removida com sucesso!');
      }, (error: HttpResponse<any>) => {
        console.log('Error');
        ToastrMensagemUtil.error(this.toastr, `${error.status}`);
      }));
  }

}
