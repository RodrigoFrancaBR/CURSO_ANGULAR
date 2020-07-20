import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const CLICK_EVENT = {
    OPEN: 'Open',
    YES: 'yes',
    NO: 'no'
};

@Component({
    selector: 'confirmation-modal',
    template: `

<!-- <div class="float-right mt-3">
    <button class="btn btn-light rounded border border-secondary" id="btnForcar" type="button" (click)="oepn(content)">
    <strong class="text-secondary">{{openButtonName}}</strong>
    </button>
</div> -->

<ng-template #content let-c="close" let-d="dismiss">

    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">{{title}}</h4>
      <!-- <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button> -->
    </div>

    <div class="modal-body">
        {{body}}
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="yes()">{{yesButtonName}}</button>
        <button type="button" class="btn btn-secondary" (click)="no()">{{noButtonName}}</button>
    </div>

</ng-template>

  `,
    // templateUrl: './modal-config.html',
    // add NgbModalConfig and NgbModal to the component providers
    // providers: [NgbModalConfig, NgbModal]
})
export class ModalConfirmacaoComponent implements OnChanges {
    @ViewChild('content', { static: false }) c: any;
    @Input() openButtonName = 'open';
    @Input() title = 'Title';
    @Input() body = 'Body';
    @Input() yesButtonName = 'Yes';
    @Input() noButtonName = 'No';

    @Output() modalClickEvent = new EventEmitter();
    @Input() openModal = false;
    @Output() openClickEvent = new EventEmitter();


    ngbModalRef: NgbModalRef;


    constructor(
        ngbModalConfig: NgbModalConfig,
        private ngbModal: NgbModal) {
        // customize default values of modals used by this component tree
        ngbModalConfig.backdrop = 'static';
        ngbModalConfig.keyboard = false;
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.openModal) {
            
            this.open(this.c);
        }
    }

    open(content) {
        let modal = null;
        this.ngbModalRef = this.ngbModal.open(
            content,
            { size: 'sm', windowClass: 'confirmationModal' });
        setTimeout(() => {
            modal = document.querySelector('.confirmationModal');
            modal.classList.remove('fade');
        }, 100);
    }

    yes() {
        this.ngbModalRef.close();
        this.modalClickEvent.emit(CLICK_EVENT.YES);
    }

    no() {
        this.ngbModalRef.dismiss();
        this.modalClickEvent.emit(CLICK_EVENT.NO);
    }

}
