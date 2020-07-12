import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MymodalcomponentComponent } from './components/mymodalcomponent/mymodalcomponent.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prj-angular';
  // title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  open() {
    const modalRef = this.modalService.open(MymodalcomponentComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }

}
