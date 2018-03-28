import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-warning-popup',
    templateUrl: './warning-popup.component.html',
    styleUrls: ['./warning-popup.component.scss']
})
export class WarningPopupComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();

    title = 'Warning';

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

}
