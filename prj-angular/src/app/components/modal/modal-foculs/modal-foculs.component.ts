import { Component, OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-foculs',
  templateUrl: './modal-foculs.component.html',
  styleUrls: ['./modal-foculs.component.css']
})
export class ModalFoculsComponent {

  constructor(public modal: NgbActiveModal, config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

}
