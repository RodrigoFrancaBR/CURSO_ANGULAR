import { Unidade } from './../../model/unidade';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/unidades';

@Injectable({
  providedIn: 'root'
})

export class UnidadeService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  salvarUnidade(unidade: Unidade): Observable<Unidade> {
    return this.http.post<Unidade>(baseUrl, unidade);
  }

  obterUnidades(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(baseUrl);
  }

  buscarUnidadePorId(id: string): Observable<Unidade> {
    const url = `${baseUrl}/${id}`;
    return this.http.get<Unidade>(url);
  }

  atualizaUnidade(unidade: Unidade): Observable<Unidade> {
    const url = `${baseUrl}/${unidade.id}`;
    return this.http.put<Unidade>(url, unidade);
  }

}
