import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class AlunosService {
  salvarAluno(arg0: any) {
    return of(null)
  }
  atualizarAluno(arg0: any) {
    return of(null)
  }

  excluirAluno(id: number): Observable<any> {
    return of(null)
  }

  bustarTodosAlunos(): Observable<Array<Aluno>> {
    let listaDeAlunos: Array<Aluno> = []
    for (let index = 0; index < 5; index++) {
      let aluno: Aluno = new Aluno();
      aluno.id = index;
      aluno.nome = `Aluno_${index}`;
      aluno.status = 'ATIVO';
      listaDeAlunos.push(aluno);
    }

    return of(listaDeAlunos);
  }

  buscarAlunoPorId(idSelecionado: number): Observable<Aluno> {
    let aluno: Aluno = new Aluno();
    aluno.id = 1;
    aluno.nome = 'Rodrigo';
    return of(aluno);
  }

  constructor() { }
}
