import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../../../../../services/api.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();
    @Output() forgotPasswordTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();

    title = 'Change password';
    form: FormGroup;
    passwordsMatch = true;
    apiError: string;
    buttonLoading = false;

    constructor(private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createForm();
        this.checkMatch();
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onPasswordChange(): void {
        this.buttonLoading = true;
        this.apiService.changePassword(this.form.controls['oldPassword'].value, this.form.controls['newPassword'].value)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('Change carer password success response', response);
                    this.notificationService.success('Success', 'Password changed');
                    $('#' + this.type + '_id').modal('hide');
                }, error => {
                    this.buttonLoading = false;
                    console.log('Change carer password error respomse', error);
                    this.handleErrorResponse(error.error.errors);
                }
            );
    }

    private checkMatch(): void {
        this.form.controls['newPassword'].valueChanges
            .debounceTime(400)
            .subscribe(
                (data: string) => {
                    const matched = this.form.controls['confirmPassword'].value;
                    (matched !== null && matched !== '' && matched !== data) ? this.passwordsMatch = false : this.passwordsMatch = true;
                }
            );

        this.form.controls['confirmPassword'].valueChanges
            .debounceTime(400)
            .subscribe(
                data => {
                    const matched = this.form.controls['newPassword'].value;
                    (matched !== null && matched !== '' && matched !== data) ? this.passwordsMatch = false : this.passwordsMatch = true;
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            'oldPassword': new FormControl(null, Validators.required),
            'newPassword': new FormControl(null, Validators.required),
            'confirmPassword': new FormControl(null, Validators.required)
        });
    }

    private handleErrorResponse(errors: any[]): void {
        this.apiError = errors[0].message;
    }

}
