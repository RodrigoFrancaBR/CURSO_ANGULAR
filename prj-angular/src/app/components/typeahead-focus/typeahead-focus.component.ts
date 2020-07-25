import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-typeahead-focus',
  templateUrl: './typeahead-focus.component.html',
  styleUrls: ['./typeahead-focus.component.css']
})
export class TypeaheadFocusComponent implements OnInit {

  model: any;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  listaAlcadaDesconto: { idFila: string; fxInicio: number; fxFim: number; vlPercDesc: number; inRent: string; }[];
  constructor() { }

  ngOnInit() {
    this.listaAlcadaDesconto = [
      {
        idFila: 'Todas',
        fxInicio: 60,
        fxFim: 80,
        vlPercDesc: 5,
        inRent: 'Não'
      },
      {
        idFila: 'ATV',
        fxInicio: 60,
        fxFim: 80,
        vlPercDesc: 5,
        inRent: 'Não'
      },
      {
        idFila: 'ATV',
        fxInicio: 0,
        fxFim: 0,
        vlPercDesc: 0,
        inRent: 'Não'
      },
      {
        idFila: 'ENC',
        fxInicio: 1800,
        fxFim: 5000,
        vlPercDesc: 2,
        inRent: 'Não'
      },
    ]

  }


}