import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {numbers} from '../../../../../../utilities/validators';
import {GoogleService} from '../../../../services/google.service';
import {MapsAPILoader} from '@agm/core';
import {AuthService} from '../../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-care-home-my-profile',
    templateUrl: './care-home-my-profile.component.html',
    styleUrls: ['./care-home-my-profile.component.scss']
})
export class CareHomeMyProfileComponent implements OnInit, AfterViewInit {
    profileDetails: any;
    form: FormGroup;
    floorPlanFile: File;
    floorPlanError: string;
    selectedTab: number;
    blockedCarers: any[] = [];

    private validMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    showEditEmail = false;
    showChangePassword = false;
    showBlockedCarers = false;
    buttonLoading = false;

    @ViewChild('search') searchElementRef: ElementRef;

    searchControl: FormControl;

    constructor(private apiService: ApiService,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private googleService: GoogleService,
                private authService: AuthService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.searchControl = new FormControl();
        this.createForm();
        this.getProfile();
    }

    ngAfterViewInit() {
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    const findedData = this.googleService.searchForAddresProperties(place.address_components);
                    this.form.controls['city'].setValue(findedData.city);
                    this.form.controls['postal_code'].setValue(findedData.postal_code);
                    this.form.controls['address_line_1'].setValue(`${findedData.street} ${findedData.street_number}`);
                });
            });
        });
    }

    onUpdateProfile(): void {
        this.buttonLoading = true;
        this.apiService.updateCareHomeProfile(this.prepareDataToUpdate())
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('Edit care home profile success response', response);
                    this.notificationService.success('Profile updated successfully');
                    this.getProfile();
                },
                error => {
                    this.buttonLoading = false;
                    console.log('Edit care home profile error response', error);
                    this.notificationService.error('Profile update failed');
                }
            );
    }

    onResendEmail(): void {
        this.apiService.resendEmail()
            .subscribe(
                response => {
                    console.log('Resend email success response', response);
                    this.notificationService.success('Success', 'Email verification resend');
                },
                error => {
                    console.log('Resend email error response', error);
                }
            );
    }

    onUpdateData(): void {
        this.getProfile();
    }

    getFloorPlan(): string {
        return `${this.profileDetails.care_home.general_guidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }

    handleFileInput(files: FileList) {
        const file = files.item(0);
        if (this.validMimeTypes.indexOf(file.type) !== -1) {
            this.floorPlanError = null;
            this.floorPlanFile = file;
        } else {
            this.floorPlanError = 'Invalid file type';
        }
    }

    onTabChange(index: number): void {
        this.selectedTab = index;
    }

    private getProfile(): void {
        this.apiService.getUserProfile()
            .subscribe(
                response => {
                    console.log('get care home profile success response', response);
                    this.profileDetails = response;
                    this.blockedCarers = this.profileDetails.care_home.blocked_carers;
                    this.setUpForm();
                    this.setUpPreferenceTab();
                },
                error => {
                    console.log('get care home profile error response', error);
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            care_service_name: new FormControl(null),
            type_of_home: new FormControl(null),
            city: new FormControl(null, Validators.required),
            postal_code: new FormControl(null, Validators.required),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(null),
            phone_number: new FormControl(null, [
                Validators.required, Validators.minLength(6), Validators.maxLength(9), numbers
            ]),
            floor_plan: new FormControl(null),
            parking: new FormControl(null),
            notes_for_carers: new FormControl(null),
            emergency_guidance: new FormControl(null),
            report_contact: new FormControl(null),
            superior_contact: new FormControl(null),
            notes: new FormControl(''),
        });
    }

    private setUpForm(): void {
        this.form.get('name').setValue(this.profileDetails.care_home.name);
        this.form.get('care_service_name').setValue(this.profileDetails.care_home.care_service_name);
        this.form.get('type_of_home').setValue(this.profileDetails.care_home.type_of_home);
        this.form.get('city').setValue(this.profileDetails.address.city);
        this.form.get('postal_code').setValue(this.profileDetails.address.postal_code);
        this.form.get('address_line_1').setValue(this.profileDetails.address.address_line_1);
        this.form.get('address_line_2').setValue(this.profileDetails.address.address_line_2);
        this.form.get('phone_number').setValue(this.profileDetails.phone_number);
        this.form.get('parking').setValue(this.profileDetails.care_home.general_guidance.parking);
        this.form.get('notes_for_carers').setValue(this.profileDetails.care_home.general_guidance.notes_for_carers);
        this.form.get('emergency_guidance').setValue(this.profileDetails.care_home.general_guidance.emergency_guidance);
        this.form.get('report_contact').setValue(this.profileDetails.care_home.general_guidance.report_contact);
        this.form.get('superior_contact').setValue(this.profileDetails.care_home.general_guidance.superior_contact);
    }

    private prepareDataToUpdate(): any {
        const formData = new FormData();
        const keys = Object.keys(this.form.value);
        keys.forEach((key) => {
            formData.append(key, this.form.get(key).value);
            console.log(key, this.form.get(key).value);
        });
        if (this.floorPlanFile) {
            formData.append('floor_plan', this.floorPlanFile);
        }
        formData.append('gender_preference', this.getGenderPreference());

        return formData;
    }

    private setUpPreferenceTab(): void {
        switch (this.profileDetails.care_home.gender_preference) {
            case 'No preference': {
                this.selectedTab = 0;
                break;
            }
            case 'Male': {
                this.selectedTab = 1;
                break;
            }
            case 'Female': {
                this.selectedTab = 2;
                break;
            }
        }
    }

    private getGenderPreference(): string {
        switch (this.selectedTab) {
            case 0: {
                return 'No preference';
            }
            case 1: {
                return 'Male';
            }
            case 2: {
                return 'Female';
            }
        }
        return 'No preference';
    }

}
