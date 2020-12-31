import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from 'src/app/model/login';

@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class LoginService {

  mostrarMenuEmitter = new EventEmitter<boolean>();
  usuarioAutenticado = false;

  constructor(private router: Router) {    
  }

  efetuarLogin(login: Login): void {
    this.usuarioAutenticado = (login.userName === 'rodrigo' && login.password === '123') ? true : false;
  }

  usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  navigate(comands: Array<any>): Promise<boolean> {
    return this.router.navigate(comands);
  }

}
