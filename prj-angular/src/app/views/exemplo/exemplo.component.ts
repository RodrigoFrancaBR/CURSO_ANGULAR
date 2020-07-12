import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFoculsComponent } from 'src/app/components/modal/modal-foculs/modal-foculs.component';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {

  constructor(private modal: NgbModal) { }

  title = 'ng-bootstrap-modal-demo';

  condition = false;

  open() {
    this.modal.open(ModalFoculsComponent, { size: 'sm' });
  }
}
