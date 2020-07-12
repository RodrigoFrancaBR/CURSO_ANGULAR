import { ChangeDetectorRef, EventEmitter, OnInit, AfterViewInit, OnDestroy, Component } from '@angular/core';

@Component({
    selector: 'app-efx-modal',
    templateUrl: './efx-modal.component.html',
})
export declare class EfxModalComponent implements OnInit, AfterViewInit, OnDestroy {

    private changeDetectorRef;
    /** The title to appear in the header */
    title: string;
    /** Used to display title icon (default to empty string / no icon) (font-awesome string) */
    titleIcon: string;
    /** An id to use for the dom element. An id will be generated if none is provided here */
    controlId: string;
    /** If this is true, then render the modal with a small width */
    isSmall: boolean;
    /** a boolean which determines if the modal fades in or not */
    fadeIn: boolean;
    /** A label to use for the default Cancel button (default: 'Cancel') */
    cancelLabel: string;
    /** A label to use for the default Submit button (default: Submit) */
    submitLabel: string;
    showSubmit: boolean;
    showCancel: boolean;
    showFooter: boolean;
    /** A boolean telling whether the close button should be shown or not */
    showClose: boolean;
    /** A boolean telling whether to prevent default closing of modal either by clicking outside or pressing escape button */
    preventDefaultClose: boolean;
    /** A boolean which determines if the modal is shown. This should use two-way binding */
    show: boolean;
    showChange: EventEmitter<{}>;
    /** An event which is triggered when the cancel button is clicked */
    onCancel: EventEmitter<{}>;
    /** An event which triggers when the modal is submitted */
    onSubmit: EventEmitter<{}>;
    /** An event which triggers when the modal is hidden */
    onHide: EventEmitter<{}>;
    /** An event which triggers when the modal is shown */
    onShow: EventEmitter<{}>;
    /** An event which triggers before the modal is hidden */
    onBeforeHide: EventEmitter<{}>;
    // tslint:disable-next-line: variable-name
    private _show;
    private isShowing;
    private $modal;
    backdrop: any;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private generateControlId;
    private _showModal;
    private _hideModal;
    private modalDidShow;
    private modalDidHide;
    private beforeModalHide;
    private didCancel;
    private didSubmit;
    readonly modalSize: "modal-sm" | "modal-lg";
}

