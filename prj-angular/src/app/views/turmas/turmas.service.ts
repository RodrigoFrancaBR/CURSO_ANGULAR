import { TurmaDTO } from './../../interfaces/tudma.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Turma } from 'src/app/model/turma';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { Injectable } from '@angular/core';

/*Integração com json server
  const baseUrl = 'http://localhost:3001/unidades';
*/
const baseUrl = 'api/turmas';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class TurmasService {

  listaDeTurmas: Turma[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) { }

  salvarTurma(turmaDTO: TurmaDTO): Observable<Turma> {
    console.log(`POST:${baseUrl}`);
    return this.http.post<Turma>(baseUrl, turmaDTO)
      .pipe(tap(() => {
      }, (httpErrorResponse: HttpErrorResponse) => {
        ToastrMensagemUtil.error(this.toastr, httpErrorResponse.error);
      }));
  }

  bustarTodasTurmas(): Observable<Array<Turma>> {
    console.log(`GET:${baseUrl}`);
    return this.http.get<Array<Turma>>(baseUrl)
      .pipe(tap(() => {
      }, (httpErrorResponse: HttpErrorResponse) => {
        ToastrMensagemUtil.error(this.toastr, httpErrorResponse.error);
      }));
  }

  buscarTurmaPorId(id: number): Observable<TurmaDTO> {
    console.log(`GET:${baseUrl}/${id}`);
    return this.http
      .get<any>(`${baseUrl}/${id}`)
      .pipe(tap((response) => {
        console.log(response);
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
      }));
  }

  atualizarTurma(turma: Turma): Observable<any> {
    console.log(`PUT:${baseUrl}/${turma.id}`);
    return this.http.put(`${baseUrl}/${turma.id}`, turma)
      .pipe(tap(() => {
        ToastrMensagemUtil.success(this.toastr, 'Turma atualizada com sucesso!');
      }, (httpErrorResponse: HttpErrorResponse) => {
        ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
      }));
  }

  excluirTurma(id: number) {
    console.log(`DELETE:${baseUrl}/${id}`);
    return this.http
      .delete<Turma>(`${baseUrl}/${id}`)
      .pipe(tap(() => {
        ToastrMensagemUtil.success(this.toastr, 'Turma removida com sucesso!');
      }, (httpErrorResponse: HttpErrorResponse) => {
        ToastrMensagemUtil.error(this.toastr, `${httpErrorResponse.error}`);
      }));
  }

  temPermissaoParaIncluir(): boolean {
    ToastrMensagemUtil.error(this.toastr, `Usuário sem permissão para incluir uma nova turma`);
    return false;
  }

}
