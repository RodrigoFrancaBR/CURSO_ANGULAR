import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Unidade } from 'src/app/model/unidade';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';


/*Integração com json server
  const baseUrl = 'http://localhost:3001/unidades';
*/
const baseUrl = 'api/unidades';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // listaDeUnidades: Unidade[] = [];

  // constructor(
  //   private http: HttpClient,
  //   private toastr: ToastrService) { }

  // salvarUnidade(unidade: Unidade): Observable<Unidade> {
  //   console.log(`POST:${baseUrl}`);
  //   return this.http.post<Unidade>(baseUrl, unidade)
  //     .pipe(tap(() => {
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       ToastrMensagemUtil.error(this.toastr, httpErrorResponse.error);
  //     }));
  // }

  // bustarTodasUnidades(): Observable<Array<Unidade>> {
  //   console.log(`GET:${baseUrl}`);
  //   return this.http.get<Array<Unidade>>(baseUrl)
  //     .pipe(tap(() => {
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       ToastrMensagemUtil.error(this.toastr, httpErrorResponse.error);
  //     }));
  // }

  // buscarUnidadePorId(id: number): Observable<Unidade> {
  //   console.log(`GET:${baseUrl}/${id}`);
  //   return this.http
  //     .get<Unidade>(`${baseUrl}/${id}`)
  //     .pipe(tap(() => {
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       console.log(httpErrorResponse);
  //       ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
  //     }));
  // }

  // atualizaUnidade(unidade: Unidade, id: number): Observable<any> {
  //   console.log(`PUT:${baseUrl}/${id}`);
  //   return this.http.put(`${baseUrl}/${id}`, unidade)
  //     .pipe(tap(() => {
  //       ToastrMensagemUtil.success(this.toastr, 'Unidade atualizada com sucesso!');
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
  //     }));
  // }

  // excluirUnidade(id: number) {
  //   console.log(`DELETE:${baseUrl}/${id}`);
  //   return this.http
  //     .delete<Unidade>(`${baseUrl}/${id}`)
  //     .pipe(tap(() => {
  //       ToastrMensagemUtil.success(this.toastr, 'Unidade removida com sucesso!');
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
  //     }));
  // }

}
