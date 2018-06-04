import {Component, OnInit} from '@angular/core';
import {ParameterizationService} from '../../../services/parameterization.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {password} from '../../../../../utilities/validators';


@Component({
    selector: 'app-parameterization',
    templateUrl: './parameterization.component.html',
    styleUrls: ['./parameterization.component.scss']
})
export class ParameterizationComponent implements OnInit {
    usersRoles;
    form: FormGroup;
    pricing;
    private fb: FormBuilder

    constructor(private parameterizationService: ParameterizationService,  private fb: FormBuilder) {
    }

    ngOnInit() {
        this.getGeneralPricingRoles();


    }

    private generateForm() {
        this.form = this.fb.group({
            'hour_0_1': fb.group({
                'monday_price': [this.pricing['hour_0_1']['monday_price'], []],
                'tuesday_price': [this.pricing['hour_0_1']['tuesday_price'], []]
            }, {validator: []}),
            'hour_1_2': fb.group({
                'monday_price': ['', []],
                'tuesday_price': ['', []],
            }, {validator: []})
        });
    }


    private getCommissionParameters(): void {
        this.parameterizationService.getCommissionParameters()
            .subscribe((response) => {

            });
    }

    private getGeneralPricingRoles(): void {
        this.parameterizationService.getGeneralPricingRoles()
            .subscribe((response) => {
                this.usersRoles = response.roles;
                this.getGeneralPricing(response.roles[0]['_id']);


            });
    }



    private getGeneralPricing(roleId): void {
        this.parameterizationService.getGeneralPricing(roleId)
            .subscribe((response) => {
                this.pricing = response.pricing;
                this.generateForm();
            });
    }

    private getNotificationsParameters(): void {
        this.parameterizationService.getNotificationsParameters()
            .subscribe((response) => {
                console.log(response);
            });
    }

    private getSpecialDatePricing(specialDateId): void {
        this.parameterizationService.getSpecialDatePricing(specialDateId)
            .subscribe((response) => {
                console.log(response);
            });
    }

    private getSpecialDates(): void {
        this.parameterizationService.getSpecialDates()
            .subscribe((response) => {
                console.log(response);
            });
    }


}
