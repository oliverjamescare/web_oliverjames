import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StripeService} from 'ngx-stripe';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();
    @Output() forgotPasswordTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() reload = new EventEmitter();

    title = 'Bank account details';
    form: FormGroup;
    apiError: string;
    buttonLoading = false;

    constructor(private stripeService: StripeService,
                private apiService: ApiService,
                private notificationService: NotificationsService) {
        this.createForm();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onAccountStore(): void {
        this.buttonLoading = true;
        console.log('Form value', this.form.value);
        this.stripeService.createToken('bank_account', this.form.value)
            .subscribe(result => {
                if (result.token) {
                    // Use the token to create a charge or a customer
                    // https://stripe.com/docs/charges
                    console.log(result.token);
                    this.storeAccountDataInApi(result.token.id);
                } else if (result.error) {
                    // Error creating the token
                    console.log(result.error.message);
                    this.apiError = result.error.message;
                    this.buttonLoading = false;
                }
            });
    }

    private storeAccountDataInApi(token: string): void {
        this.apiService.updateBankDetails(token)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('update account details success response', response);
                    this.notificationService.success('Bank details successfully stored');
                    $('#' + this.type + '_id').modal("hide");
                    this.reload.emit();
                },
                error => {
                    this.buttonLoading = false;
                    console.log('update account details error response', error);
                    this.notificationService.warn('Unable to store bank details');
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            country: new FormControl(null, Validators.required),
            currency: new FormControl(null, Validators.required),
            routing_number: new FormControl(null, Validators.required),
            account_number: new FormControl(null, Validators.required),
            account_holder_name: new FormControl(null, Validators.required),
            account_holder_type: new FormControl(null, Validators.required),
        });
    }

}
