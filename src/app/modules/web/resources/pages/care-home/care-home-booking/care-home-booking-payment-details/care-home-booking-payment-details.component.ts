import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {StripeService, Elements, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-care-home-booking-payment-details',
    templateUrl: './care-home-booking-payment-details.component.html',
    styleUrls: ['./care-home-booking-payment-details.component.scss']
})
export class CareHomeBookingPaymentDetailsComponent implements OnInit {
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
                private notificationService: NotificationsService,
                private router: Router,
                private bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
        });

        if(!this.stripeService)
            this.apiError = "To store bank details you have to use https";
        else
        {
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

    }

    onCardDetailsSave()
    {
        this.buttonLoading = true;
        if (!this.stripeTest.valid) {
            this.formError = 'Name is required';
        }
        const name = this.stripeTest.get('name').value;

        if(!this.stripeService)
            this.apiError = "To store bank details you have to use https";
        else
        {
            this.stripeService
                .createToken(this.card, { name })
                .subscribe(result =>
                {
                    if (result.token)
                        this.updateCardDetailsOnApi(result.token.id);
                    else if (result.error)
                    {
                        this.apiError = result.error.message;
                        this.buttonLoading = false;
                    }
                });
        }
    }

    private updateCardDetailsOnApi(token: string): void {
        this.apiService.updateCardDetails(token)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    this.notificationService.success('Card details saved');
                    this.router.navigate(['/care-home-booking', 'review']);
                },
                error => {
                    this.buttonLoading = false;
                    this.notificationService.warn('Unable to store card data to api');
                }
            );
    }

}
