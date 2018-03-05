import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CarerJobService} from '../../../../../../services/carer-job.service';

@Component({
    selector: 'app-confirmation-popup',
    templateUrl: './confirmation-popup.component.html',
    styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
    @Output() close = new EventEmitter();
    confirmed = false;

    constructor(public carerJobService: CarerJobService) {
    }

    ngOnInit() {
    }

    onClosePopup(): void {
        this.close.emit();
    }

    onCheckBoxChange(): void {
        this.confirmed = !this.confirmed;
    }

    onConfirm(): void {
        this.close.emit();
    }

}
