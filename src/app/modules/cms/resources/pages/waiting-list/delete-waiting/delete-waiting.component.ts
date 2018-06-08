import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, OnDestroy} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {HttpErrorResponse} from '@angular/common/http';
import {getMessageError} from '../../../../../../utilities/form.utils';
import {WaitingListService} from '../../../../services/waiting-list.service';

@Component({
    selector: 'app-delete-waiting',
    templateUrl: './delete-waiting.component.html',
    styleUrls: ['./delete-waiting.component.scss']
})
export class DeleteWaitingComponent implements AfterViewInit {
    @Input() title: string;
    @Input() type: string;
    @Input() waitingId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    inProgress: boolean = false;
    error: string = '';

    constructor(private waitingListService: WaitingListService, private notificationService: NotificationsService) {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));

    }
    OnDestroy() {
        $('#' + this.type + '_id').modal('hide');
        this.reload.emit();
    }


    removeItem(): void {
        this.waitingListService
            .deleteWaitingUser(this.waitingId)
            .subscribe(() => {
                $('#' + this.type + '_id').modal('hide');
                this.notificationService.success('Item removed');
                this.reload.emit();
            });

    }

    cancel(): void {
        $('#' + this.type + '_id').modal('hide');
        this.reload.emit();
    }




}
