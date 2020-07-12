import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalFoculsComponent } from 'src/app/components/modal/modal-foculs/modal-foculs.component';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {

  constructor(config: NgbModalConfig, private modal: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  title = 'ng-bootstrap-modal-demo';

  condition = false;

  open(content) {
    this.modal.open(content, { size: 'sm' });
  }
}
