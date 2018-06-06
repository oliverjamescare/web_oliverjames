import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ParameterizationService} from '../../../../services/parameterization.service';
import {NotificationsService} from 'angular2-notifications';
import {HttpErrorResponse} from '@angular/common/http';
import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../utilities/form.utils';

@Component({
    selector: 'app-delete-day',
    templateUrl: './delete-day.component.html',
    styleUrls: ['./delete-day.component.scss']
})
export class DeleteDayComponent implements AfterViewInit, OnInit {
    @Input() title: string;
    @Input() type: string;
    @Input() specialDayDeleteId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();


    inProgress: boolean = false;
    error: string = '';

    constructor(private parameterizationService: ParameterizationService, private notificationService: NotificationsService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));

    }

    deleteSpecialDay(): void {
        this.parameterizationService.deleteSpecialDay(this.specialDayDeleteId)
            .subscribe(() => {
                    this.notificationService.success('Day removed');
                    this.inProgress = false;
                    this.reload.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });
    }

    cancelDeleteSpecialDay(): void {
        $('#' + this.type + '_id').modal('hide');
    }


}
