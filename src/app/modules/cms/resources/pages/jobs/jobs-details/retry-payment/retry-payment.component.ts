import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { getMessageError } from '../../../../../../../utilities/form.utils';
import { NotificationsService } from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { JobsService } from '../../../../../services/jobs.service';

@Component({
    selector: 'app-retry-payment',
    templateUrl: './retry-payment.component.html',
    styleUrls: ['./retry-payment.component.scss']
})
export class RetryPaymentComponent implements AfterViewInit
{
    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    //form
    inProgress: boolean = false;
    error: string = '';

    constructor(private jobsService: JobsService, private notificationService: NotificationsService) {}

    ngAfterViewInit()
    {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onAccept(): void
    {
        this.inProgress = true;
        this.jobsService
            .retryJobPayment(this.jobId)
            .subscribe(() =>
                {
                    this.notificationService.success('Payment scheduled');
                    this.inProgress = false;
                    this.reload.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                (error: HttpErrorResponse) =>
                {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });

    }
}
