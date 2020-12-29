import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../interfaces/estados.interface';
// import { EstadoBr } from './../models/estado.l';
// import { Cidade } from '../models/cidade';
// import { map } from '../../../../node_modules/rxjs/operators';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<Array<Estado>>('assets/dados/estados.json');
  }

  // getCidades(idEstado: number) {
  //   return this.http.get<Cidade[]>('assets/dados/cidades.json')
  //   .pipe(
  //     // tslint:disable-next-line:triple-equals
  //     map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
  //   );
  // }

  // getCargos() {
  //   return [
  //     { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
  //     { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
  //     { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
  //   ];
  // }

  // getTecnologias() {

  //   return [
  //     { nome: 'java', desc: 'Java' },
  //     { nome: 'javascript', desc: 'JavaScript' },
  //     { nome: 'php', desc: 'PHP' },
  //     { nome: 'ruby', desc: 'Ruby' }
  //   ];
  // }

  getSexo() {
    return [
      { chave: 'f', valor: 'Feminino' },
      { chave: 'm', valor: 'Masculino' }
    ];
  }
}
