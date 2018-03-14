import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-change-email',
    templateUrl: './change-email.component.html',
    styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();
    @Output() update = new EventEmitter();
    form: FormGroup;
    title = 'Change email';
    apiError: string;
    buttonLoading = false;

    constructor(private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createForm();
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onEmailChange(): void {
        this.buttonLoading = true;
        this.apiService.changeEmail(this.form.controls['email'].value)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('Change email success response', response);
                    this.notificationService.success(
                        'Success',
                        'Your email will change once you tap the link we’ve emailed to that address'
                    );
                    this.update.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                error => {
                    this.buttonLoading = false;
                    console.log('Change email error response', error);
                    this.handleErrorResponse(error.error.errors);
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email])
        });
    }

    private handleErrorResponse(errors: any[]): void {
        this.apiError = errors[0].message;
    }

}
