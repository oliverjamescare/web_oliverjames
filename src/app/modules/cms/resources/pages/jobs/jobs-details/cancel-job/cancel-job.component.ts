import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {JobsService} from '../../../../../services/jobs.service';
import {NotificationsService} from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { getMessageError } from '../../../../../../../utilities/form.utils';

@Component({
    selector: 'app-cancel-job',
    templateUrl: './cancel-job.component.html',
    styleUrls: ['./cancel-job.component.scss']
})
export class CancelJobComponent implements AfterViewInit
{
    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    inProgress: boolean = false;
    error: string = '';

    constructor(private jobsService: JobsService, private notificationService: NotificationsService) {}

    ngAfterViewInit()
    {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onCancelJob(waiveCharges: string): void
    {
        this.inProgress = true;
        this.jobsService
            .cancelJob(this.jobId, waiveCharges)
            .subscribe(() =>
                {
                    this.notificationService.success('Job cancelled');
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
