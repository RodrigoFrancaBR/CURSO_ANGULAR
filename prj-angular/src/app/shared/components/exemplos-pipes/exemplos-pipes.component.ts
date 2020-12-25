import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP',

    valor_1: 0.1,
    valor_2: 0.10,
    valor_3: 0.01,
    valor_4: 11111.11,
  };

  constructor() { }

  ngOnInit() {

    let nomes = ['rodrigo', 'bruna', 'sophia'];

    let filtro = 'una';

    let nomesFiltrados = [];

    nomesFiltrados = nomes.filter(nome => {
      let indice = nome.indexOf(filtro);
      return indice != -1;
    });
    console.log(nomesFiltrados);
  }

}
