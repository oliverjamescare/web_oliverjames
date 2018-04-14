import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CareHomeService} from '../../../../../../services/care-home.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-block-carer-confirmation',
    templateUrl: './block-carer-confirmation.component.html',
    styleUrls: ['./block-carer-confirmation.component.scss']
})
export class BlockCarerConfirmationComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() carerId: string;
    @Output() closed = new EventEmitter();

    title = 'Block carer';
    buttonLoading = false;

    constructor(private careHomeService: CareHomeService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        console.log('Carer id', this.carerId);
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

    onBlockCarer(): void {
        this.careHomeService.addCarerToBlocked(this.carerId)
            .subscribe(
                response => {
                    console.log('Add carer to blocked success response', response);
                    this.notificationService.success('Carer blocked');
                    $('#' + this.type + '_id').modal('hide');
                },
                error => {
                    console.log('Add carer to blocked error response', error);
                }
            );
    }


}
