import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-challenge-confirmation',
    templateUrl: './challenge-confirmation.component.html',
    styleUrls: ['./challenge-confirmation.component.scss']
})
export class ChallengeConfirmationComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();

    title = 'Challenge confirmation';

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
