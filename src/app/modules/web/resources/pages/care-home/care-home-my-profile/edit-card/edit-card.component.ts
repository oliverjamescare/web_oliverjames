import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {Element as StripeElement, Elements, ElementsOptions, StripeService} from 'ngx-stripe';
import {ApiService} from '../../../../../services/api.service';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, AfterViewInit {
    @Input() type = 'card_details';
    @Output() closed = new EventEmitter();

    title = 'Edid card details';
    elements: Elements;
    card: StripeElement;
    @ViewChild('card') cardRef: ElementRef;

    // optional parameters
    elementsOptions: ElementsOptions = {
        locale: 'en'
    };

    stripeTest: FormGroup;

    apiError: string;
    formError: string;
    buttonLoading = false;

    constructor(private fb: FormBuilder,
                private stripeService: StripeService,
                private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
        });
        this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
                this.elements = elements;
                // Only mount the element the first time
                if (!this.card) {
                    this.card = this.elements.create('card', {
                        style: {
                            base: {
                                iconColor: '#666EE8',
                                color: '#31325F',
                                lineHeight: '40px',
                                fontWeight: 300,
                                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                fontSize: '18px',
                                '::placeholder': {
                                    color: '#CFD7E0',
                                    value: 'asd'
                                }
                            }
                        }
                    });
                    this.card.mount(this.cardRef.nativeElement);
                }
            });
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onCardDetailsSave() {
        this.buttonLoading = true;
        if (!this.stripeTest.valid) {
            this.formError = 'Name is required';
        }
        const name = this.stripeTest.get('name').value;
        this.stripeService
            .createToken(this.card, {name})
            .subscribe(result => {
                if (result.token) {
                    // Use the token to create a charge or a customer
                    // https://stripe.com/docs/charges
                    console.log(result.token);
                    this.updateCardDetailsOnApi(result.token.id);
                } else if (result.error) {
                    // Error creating the token
                    console.log(result.error.message);
                    this.apiError = result.error.message;
                    this.buttonLoading = false;
                }
            });
    }

    private updateCardDetailsOnApi(token: string): void {
        this.apiService.updateCardDetails(token)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('update card details success response', response);
                    this.notificationService.success('Card details saved');
                },
                error => {
                    this.buttonLoading = false;
                    console.log('update card details error response', error);
                    this.notificationService.warn('Enable to store card data to api');
                }
            );
    }

}
