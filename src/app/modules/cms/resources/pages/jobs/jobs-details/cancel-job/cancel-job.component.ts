import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {JobsService} from '../../../../../services/jobs.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-cancel-job',
    templateUrl: './cancel-job.component.html',
    styleUrls: ['./cancel-job.component.scss']
})
export class CancelJobComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Input() waiveCharges: boolean;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    message: string;

    constructor(private jobsService: JobsService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.message = this.waiveCharges ? 'Do you want to cancel this jo with charges APPLIED' :
            'Do you want to cancel this jo with NO charges APPLIED';
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onCancelJob(): void {
        this.jobsService.cancelJob(this.jobId, this.getWaiveCharges())
            .subscribe(
                response => {
                    this.reload.emit();
                    console.log('Cancel job success response', response);
                    this.notificationService.success('Job cancelled');
                    this.onClose();
                },
                error => {
                    console.log('Cancel job error response', error);
                }
            );
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

    private getWaiveCharges(): string {
        return this.waiveCharges ? 'YES' : 'NO';
    }

}
