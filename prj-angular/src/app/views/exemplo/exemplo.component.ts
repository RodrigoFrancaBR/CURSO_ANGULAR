import { MymodalcomponentComponent } from './../../components/mymodalcomponent/mymodalcomponent.component';
import { Component, OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalFoculsComponent } from 'src/app/components/modal/modal-foculs/modal-foculs.component';

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: ModalFoculsComponent
};

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {

  constructor(private modal: NgbModal) { }

  // tslint:disable-next-line: variable-name
  // constructor(private modalService: NgbModal) {
  //   this.modalOptions = {
  //     backdrop: 'static',
  //     backdropClass: 'customBackdrop'
  //   }
  // }

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;

  condition = false;

  // open(name: string) {
  //   this.modal.open(name);
  // }

  open() {
    this.modal.open(ModalFoculsComponent, { size: 'sm' });
    // open(name: string) {
    // this.modal.open(MODALS[name], { size: 'sm' });
  }

  openSm(content) {
    this.modal.open(content, { size: 'sm' });
  }

  // open() {
  //   const modalRef = this.modalService.open(MymodalcomponentComponent);
  //   modalRef.componentInstance.my_modal_title = 'I your title';
  //   modalRef.componentInstance.my_modal_content = 'I am your content';
  // }

  // open(content) {
  //   this.modalService.open(content, this.modalOptions).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
