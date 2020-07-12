import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngbd-modal-confirm',
  templateUrl: './ngbd-modal-confirm.component.html',
  styleUrls: ['./ngbd-modal-confirm.component.css']
})
export class NgbdModalConfirmComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}
