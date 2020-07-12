import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mymodalcomponent',
  templateUrl: './mymodalcomponent.component.html',
  styleUrls: ['./mymodalcomponent.component.css']
})
export class MymodalcomponentComponent implements OnInit {

  @Input() my_modal_title;
  @Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
