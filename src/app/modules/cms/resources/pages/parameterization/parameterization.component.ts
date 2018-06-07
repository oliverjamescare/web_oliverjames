import {Component, OnInit} from '@angular/core';
import {ParameterizationService} from '../../../services/parameterization.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {password} from '../../../../../utilities/validators';
import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../utilities/form.utils';
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
    formSpecialDate: FormGroup;
    formCommissionParameters: FormGroup;
    formNotificationsParameters: FormGroup;
    pricing;
    pricingSpecialDate;
    inProgress = false;
    error = '';
    errorCommission = '';
    errorSpecialDate = '';
    errorNotificationsParameters = '';
    currentRole: string;
    customList;
    showAddDayModal = false;
    showDeleteDayModal = false;
    specialDayDeleteId = '';
    specialDayId = '';
    showDayId = '';
    showNormalPricing = true;
    pricingSpecialDateDetails;
    commissionParameters;
    notificationsParameters;
    notifiedTotal = {};
    insertedId;

    formUtils = {handleValidationStateClass, handleValidationErrorMessage};


    constructor(private parameterizationService: ParameterizationService, private fb: FormBuilder, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.getGeneralPricingRoles();
        this.createCustomDatesList();
        this.getCommissionParameters();
        this.getNotificationsParameters();
    }

    private getCommissionParameters() {
        this.parameterizationService.getCommissionParameters()
            .subscribe((response) => {
                this.commissionParameters = response.general_commission;
                this.generateCommissionParameters();
            });
    }

    private generateCommissionParameters() {
        this.formCommissionParameters = new FormGroup({
            manual_booking_pricing: new FormControl(this.commissionParameters['manual_booking_pricing'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            max_to_deduct: new FormControl(this.commissionParameters['max_to_deduct'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0), Validators.max(100)]),
            app_commission: new FormControl(this.commissionParameters['app_commission'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0), Validators.max(100)]),
        });
    }


    private createGroup(groupName) {
        return {
            'monday_price': [this.pricing[groupName]['monday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'tuesday_price': [this.pricing[groupName]['tuesday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'wednesday_price': [this.pricing[groupName]['wednesday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'thursday_price': [this.pricing[groupName]['thursday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'friday_price': [this.pricing[groupName]['friday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'saturday_price': [this.pricing[groupName]['saturday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
            'sunday_price': [this.pricing[groupName]['sunday_price'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
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
            'hour_9_10':
                this.fb.group(this.createGroup('hour_9_10')),
            'hour_10_11':
                this.fb.group(this.createGroup('hour_10_11')),
            'hour_11_12':
                this.fb.group(this.createGroup('hour_11_12')),
            'hour_12_13':
                this.fb.group(this.createGroup('hour_12_13')),
            'hour_13_14':
                this.fb.group(this.createGroup('hour_13_14')),
            'hour_14_15':
                this.fb.group(this.createGroup('hour_14_15')),
            'hour_15_16':
                this.fb.group(this.createGroup('hour_15_16')),
            'hour_16_17':
                this.fb.group(this.createGroup('hour_16_17')),
            'hour_17_18':
                this.fb.group(this.createGroup('hour_17_18')),
            'hour_18_19':
                this.fb.group(this.createGroup('hour_18_19')),
            'hour_19_20':
                this.fb.group(this.createGroup('hour_19_20')),
            'hour_20_21':
                this.fb.group(this.createGroup('hour_20_21')),
            'hour_21_22':
                this.fb.group(this.createGroup('hour_21_22')),
            'hour_22_23':
                this.fb.group(this.createGroup('hour_22_23')),
            'hour_23_0':
                this.fb.group(this.createGroup('hour_23_0'))
        });
    }

    private generateSpecialDate() {
        this.formSpecialDate = new FormGroup({
            hour_0_1: new FormControl(this.pricingSpecialDate['hour_0_1'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_1_2: new FormControl(this.pricingSpecialDate['hour_1_2'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_2_3: new FormControl(this.pricingSpecialDate['hour_2_3'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_3_4: new FormControl(this.pricingSpecialDate['hour_3_4'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_4_5: new FormControl(this.pricingSpecialDate['hour_4_5'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_5_6: new FormControl(this.pricingSpecialDate['hour_5_6'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_6_7: new FormControl(this.pricingSpecialDate['hour_6_7'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_7_8: new FormControl(this.pricingSpecialDate['hour_7_8'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_8_9: new FormControl(this.pricingSpecialDate['hour_8_9'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_9_10: new FormControl(this.pricingSpecialDate['hour_9_10'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_10_11: new FormControl(this.pricingSpecialDate['hour_10_11'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_11_12: new FormControl(this.pricingSpecialDate['hour_11_12'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_12_13: new FormControl(this.pricingSpecialDate['hour_12_13'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_13_14: new FormControl(this.pricingSpecialDate['hour_13_14'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_14_15: new FormControl(this.pricingSpecialDate['hour_14_15'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_15_16: new FormControl(this.pricingSpecialDate['hour_15_16'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_16_17: new FormControl(this.pricingSpecialDate['hour_16_17'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_17_18: new FormControl(this.pricingSpecialDate['hour_17_18'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_18_19: new FormControl(this.pricingSpecialDate['hour_18_19'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_19_20: new FormControl(this.pricingSpecialDate['hour_19_20'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_20_21: new FormControl(this.pricingSpecialDate['hour_20_21'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_21_22: new FormControl(this.pricingSpecialDate['hour_21_22'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_22_23: new FormControl(this.pricingSpecialDate['hour_22_23'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
            hour_23_0: new FormControl(this.pricingSpecialDate['hour_23_0'], [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]),
        });
    }

    private onSubmitSpecialDate() {
        if (this.formSpecialDate.valid) {
            this.inProgress = true;
            this.parameterizationService
                .updateSpecialDatePricing(this.formSpecialDate.value, this.pricingSpecialDateDetails.id)
                .subscribe(() => {
                        this.inProgress = false;
                        // this.router.navigate(['admin/admins-management']);
                        this.errorSpecialDate = '';
                        this.notificationService.success('Special date pricing updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.errorSpecialDate = getMessageError(error);
                        this.inProgress = false;
                    });
        }
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
                this.notificationsParameters = response.notifications;
                this.createNotificationsParametersForm();
            });
    }

    private createNotificationsParametersForm(): void {
        this.formNotificationsParameters = new FormGroup({
            'preferred': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.preferred.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.preferred.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.preferred.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.preferred.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
            'starsFourToFive': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.starsFourToFive.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.starsFourToFive.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.starsFourToFive.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.starsFourToFive.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
            'starsThreeToFour': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.starsThreeToFour.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.starsThreeToFour.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.starsThreeToFour.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.starsThreeToFour.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
            'unrated': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.unrated.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.unrated.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.unrated.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.unrated.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
            'starsTwoToThree': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.starsTwoToThree.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.starsTwoToThree.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.starsTwoToThree.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.starsTwoToThree.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
            'starsOneToTwo': this.fb.group({
                'lessThanFourHours': [this.notificationsParameters.starsOneToTwo.lessThanFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenFourAndTwelveHours': [this.notificationsParameters.starsOneToTwo.betweenFourAndTwelveHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'betweenTwelveAndTwentyFourHours': [this.notificationsParameters.starsOneToTwo.betweenTwelveAndTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]],
                'moreThanTwentyFourHours': [this.notificationsParameters.starsOneToTwo.moreThanTwentyFourHours, [Validators.required, Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'), Validators.min(0)]]
            }, {validator: []}),
        });
        this.calculateTotalsNotifications();
    }

    private calculateTotalsNotifications(): void {
        this.notifiedTotal['moreThanTwentyFourHours'] = this.formNotificationsParameters.value.preferred.moreThanTwentyFourHours + this.formNotificationsParameters.value.starsFourToFive.moreThanTwentyFourHours + this.formNotificationsParameters.value.starsThreeToFour.moreThanTwentyFourHours + this.formNotificationsParameters.value.unrated.moreThanTwentyFourHours + this.formNotificationsParameters.value.starsTwoToThree.moreThanTwentyFourHours + this.formNotificationsParameters.value.starsOneToTwo.moreThanTwentyFourHours;
        this.notifiedTotal['betweenTwelveAndTwentyFourHours'] = this.formNotificationsParameters.value.preferred.betweenTwelveAndTwentyFourHours + this.formNotificationsParameters.value.starsFourToFive.betweenTwelveAndTwentyFourHours + this.formNotificationsParameters.value.starsThreeToFour.betweenTwelveAndTwentyFourHours + this.formNotificationsParameters.value.unrated.betweenTwelveAndTwentyFourHours + this.formNotificationsParameters.value.starsTwoToThree.betweenTwelveAndTwentyFourHours + this.formNotificationsParameters.value.starsOneToTwo.betweenTwelveAndTwentyFourHours;
        this.notifiedTotal['betweenFourAndTwelveHours'] = this.formNotificationsParameters.value.preferred.betweenFourAndTwelveHours + this.formNotificationsParameters.value.starsFourToFive.betweenFourAndTwelveHours + this.formNotificationsParameters.value.starsThreeToFour.betweenFourAndTwelveHours + this.formNotificationsParameters.value.unrated.betweenFourAndTwelveHours + this.formNotificationsParameters.value.starsTwoToThree.betweenFourAndTwelveHours + this.formNotificationsParameters.value.starsOneToTwo.betweenFourAndTwelveHours;
        this.notifiedTotal['lessThanFourHours'] = this.formNotificationsParameters.value.preferred.lessThanFourHours + this.formNotificationsParameters.value.starsFourToFive.lessThanFourHours + this.formNotificationsParameters.value.starsThreeToFour.lessThanFourHours + this.formNotificationsParameters.value.unrated.lessThanFourHours + this.formNotificationsParameters.value.starsTwoToThree.lessThanFourHours + this.formNotificationsParameters.value.starsOneToTwo.lessThanFourHours;
    }

    private getSpecialDatePricing(specialDateId): void {
        this.parameterizationService.getSpecialDatePricing(specialDateId)
            .subscribe((response) => {
                this.pricingSpecialDateDetails = {date: response.date, role: response.role, id: response._id};
                this.pricingSpecialDate = response.pricing;
                this.generateSpecialDate();
                window.scrollTo(0, 0);
            });
    }

    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            this.parameterizationService
                .updateGeneralPricing(this.currentRole, this.form.value)
                .subscribe(() => {
                        this.inProgress = false;
                        // this.router.navigate(['admin/admins-management']);
                        this.error = '';
                        this.notificationService.success('Pricing updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    onReload(): void {
        this.createCustomDatesList();
    }

    onReloadCustomList(insertedId): void {
        console.log(insertedId);
        this.createCustomDatesList();
        this.showNormalPricing = false;
        this.getSpecialDatePricing(insertedId);
    }

    private deleteCustomDay(customDayId) {
        this.specialDayDeleteId = customDayId;
        this.showDeleteDayModal = true;
    }

    changeToSpecialDateMatrix(showDateId) {
        this.showNormalPricing = false;
        this.getSpecialDatePricing(showDateId._id);
    }

    onSubmitCommissionParameters() {
        if (this.formCommissionParameters.valid) {
            this.inProgress = true;
            this.parameterizationService
                .updateCommissionParameters(this.formCommissionParameters.value)
                .subscribe(() => {
                        this.inProgress = false;
                        // this.router.navigate(['admin/admins-management']);
                        this.errorCommission = '';
                        this.notificationService.success('Commission parameters updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.errorCommission = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    onSubmitNotificationsParameters() {
        if (this.formNotificationsParameters.valid) {
            this.inProgress = true;
            this.parameterizationService
                .updateNotificationsParameters(this.formNotificationsParameters.value)
                .subscribe(() => {
                        this.inProgress = false;
                        // this.router.navigate(['admin/admins-management']);
                        this.errorNotificationsParameters = '';
                        this.notificationService.success('Carer notified updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.errorNotificationsParameters = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
