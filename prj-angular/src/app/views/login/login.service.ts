import { FormGroup } from '@angular/forms';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from 'src/app/model/login';
import { FormUtil } from 'src/app/util/form-util';

/*Integração com json server
  const baseUrl = 'http://localhost:3001/unidades';
*/

@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class LoginService {

  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuarioAutenticado = false;

  constructor(
    private router: Router
  ) {
    console.log('LoginService');
  }


  teste = '1';

  efetuarLogin(login: Login): void {
    this.usuarioAutenticado = login.login === 'rodrigo' && login.password === '123' ? true : false;
  }

  // if (login.login === 'rodrigo' && login.password === '123') {
  //   this.mostrarMenuEmitter.emit(true);
  //   this.router.navigate(['/']);
  // } else {
  //   this.mostrarMenuEmitter.emit(false);
  // }

  usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  navigate(comands: Array<any>): Promise<boolean> {
    return this.router.navigate(comands);
  }

  aplicarCSSErro(formGroup: FormGroup, controlName?: string) {
    const resultado = FormUtil.isValid(formGroup, controlName);
    // return resultado ? { 'is-invalid': true } : null;
    // usado para retornar css verde para campos válidos
    return resultado ? { 'is-invalid': true } : formGroup.get(controlName).pristine && !resultado ? null : { 'is-valid': true };
  }

   // um campo é inválido qdo possui algum erro, e se tiver sido tocado ou ganho foco.
   isValid(formGroup: FormGroup, controlName: string): boolean {
    return formGroup.get(controlName).errors
        && (formGroup.get(controlName).touched || formGroup.get(controlName).dirty) ? true : false;
}


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
