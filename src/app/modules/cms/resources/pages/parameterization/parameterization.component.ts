import {Component, OnInit} from '@angular/core';
import {ParameterizationService} from '../../../services/parameterization.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {password} from '../../../../../utilities/validators';
import {getMessageError} from '../../../../../utilities/form.utils';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';


@Component({
    selector: 'app-parameterization',
    templateUrl: './parameterization.component.html',
    styleUrls: ['./parameterization.component.scss']
})
export class ParameterizationComponent implements OnInit {
    usersRoles;
    form: FormGroup;
    pricing;
    inProgress = false;
    error = '';
    currentRole: string;
    customList;
    showAddDayModal = false;
    specialDayId = '';

    constructor(private parameterizationService: ParameterizationService, private fb: FormBuilder, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.getGeneralPricingRoles();
        this.createCustomDatesList();
    }


    private createGroup(groupName) {
        return {
            'monday_price': [this.pricing[groupName]['monday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'tuesday_price': [this.pricing[groupName]['tuesday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'wednesday_price': [this.pricing[groupName]['wednesday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'thursday_price': [this.pricing[groupName]['thursday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'friday_price': [this.pricing[groupName]['friday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'saturday_price': [this.pricing[groupName]['saturday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]],
            'sunday_price': [this.pricing[groupName]['sunday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$')]]
        };
    }

    private generateForm() {
        this.form = this.fb.group({
            'hour_0_1': this.fb.group(this.createGroup('hour_0_1')),
            'hour_1_2': this.fb.group(this.createGroup('hour_1_2')),
            'hour_2_3': this.fb.group(this.createGroup('hour_2_3')),
            'hour_3_4': this.fb.group(this.createGroup('hour_3_4')),
            'hour_4_5': this.fb.group(this.createGroup('hour_4_5')),
            'hour_5_6': this.fb.group(this.createGroup('hour_5_6')),
            'hour_6_7': this.fb.group(this.createGroup('hour_6_7')),
            'hour_7_8': this.fb.group(this.createGroup('hour_7_8')),
            'hour_8_9': this.fb.group(this.createGroup('hour_8_9')),
            'hour_9_10': this.fb.group(this.createGroup('hour_9_10')),
            'hour_10_11': this.fb.group(this.createGroup('hour_10_11')),
            'hour_11_12': this.fb.group(this.createGroup('hour_11_12')),
            'hour_12_13': this.fb.group(this.createGroup('hour_12_13')),
            'hour_13_14': this.fb.group(this.createGroup('hour_13_14')),
            'hour_14_15': this.fb.group(this.createGroup('hour_14_15')),
            'hour_15_16': this.fb.group(this.createGroup('hour_15_16')),
            'hour_16_17': this.fb.group(this.createGroup('hour_16_17')),
            'hour_17_18': this.fb.group(this.createGroup('hour_17_18')),
            'hour_18_19': this.fb.group(this.createGroup('hour_18_19')),
            'hour_19_20': this.fb.group(this.createGroup('hour_19_20')),
            'hour_20_21': this.fb.group(this.createGroup('hour_20_21')),
            'hour_21_22': this.fb.group(this.createGroup('hour_21_22')),
            'hour_22_23': this.fb.group(this.createGroup('hour_22_23')),
            'hour_23_0': this.fb.group(this.createGroup('hour_23_0'))
        });
    }

    private createCustomDatesList() {
        this.parameterizationService.getSpecialDates()
            .subscribe((response) => {
                this.customList = response.special_dates;
            });
    }

    onChangeRole(deviceValue) {
        this.getGeneralPricing(deviceValue);
        this.currentRole = deviceValue;
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
                this.currentRole = response.roles[0]['_id'];
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

    }

    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            this.parameterizationService
                .updateGeneralPricing(this.currentRole, this.form.value)
                .subscribe(() => {
                        this.inProgress = false;
                        // this.router.navigate(['admin/admins-management']);
                        this.notificationService.success('Pricing updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }
    onReload(): void
    {
        this.createCustomDatesList();
    }


}
