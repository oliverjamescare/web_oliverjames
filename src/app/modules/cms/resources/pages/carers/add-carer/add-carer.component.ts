import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {handleUniqueValidator, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../utilities/form.utils';
import {
    adult, alpha, equalTo, equalToFieldValue, greaterThan, invalidDate, numbers,
    password
} from '../../../../../../utilities/validators';
import {CarersService} from '../../../../services/carers.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-carer',
    templateUrl: './add-carer.component.html',
    styleUrls: ['./add-carer.component.scss']
})
export class AddCarerComponent implements OnInit {

    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    pcaControl: any;
    buttonLoading = false;

    messages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: 'Email is required'
                },
                {
                    error: 'email',
                    message: 'This is not a valid email address'
                },
                {
                    error: 'uniqueness',
                    message: 'This email is already taken'
                }
            ]
        },
        {
            field: 'phone_number',
            errors: [
                {
                    error: 'required',
                    message: 'Phone number is required'
                },
                {
                    error: 'numbers',
                    message: 'Phone number can contain only numbers'
                },
                {
                    error: 'uniqueness',
                    message: 'This phone number is already taken'
                },
                {
                    error: 'minlength',
                    message: 'Phone number must have 6 characters at least'
                }
            ]
        },
        {
            field: 'first_name',
            errors: [
                {
                    error: 'required',
                    message: 'First name is required'
                },
                {
                    error: 'maxlength',
                    message: 'First cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'middle_name',
            errors: [
                {
                    error: 'maxlength',
                    message: 'Middle names cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'surname',
            errors: [
                {
                    error: 'required',
                    message: 'Surname is required'
                },
                {
                    error: 'maxlength',
                    message: 'Surname cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'password',
            errors: [
                {
                    error: 'required',
                    message: 'Password is required'
                },
                {
                    error: 'minlength',
                    message: 'Password must have 6 characters at least'
                },
                {
                    error: 'password',
                    message: 'Password must have at least one letter and number'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Passwords don\'t match'
                },
            ]
        },
        {
            field: 'password_confirm',
            errors: [
                {
                    error: 'required',
                    message: 'Password confirmaton is required'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Passwords don\'t match'
                },
            ]
        },
        {
            field: 'date_of_birth',
            errors: [
                {
                    error: 'required',
                    message: 'Date of birth is required'
                },
                {
                    error: 'adult',
                    message: 'You have to be over 18 to register'
                },
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'postal_code',
            errors: [
                {
                    error: 'required',
                    message: 'Postcode is required'
                }
            ]
        },
        {
            field: 'address_line_1',
            errors: [
                {
                    error: 'required',
                    message: 'This field is required'
                }
            ]
        },
        {
            field: 'city',
            errors: [
                {
                    error: 'required',
                    message: 'City is required'
                }
            ]
        },
        {
            field: 'ukPermission',
            errors: [
                {
                    error: 'required',
                    message: 'You must select one filed'
                },
                {
                    error: 'equalTo',
                    message: 'You can\'t register if you don\'t have permissions to work in the UK'
                }
            ]
        },
        {
            field: 'mobile',
            errors: [
                {
                    error: 'required',
                    message: 'You must select one filed'
                },
                {
                    error: 'greaterThan',
                    message: 'Using mobile app is required when you register as a carer'
                }
            ]
        },
        {
            field: 'experience_months',
            errors: [
                {
                    error: 'required',
                    message: 'This field is required'
                },
                {
                    error: 'numbers',
                    message: 'This field can contain only numbers'
                },
                {
                    error: 'min',
                    message: 'This cannot be negative number'
                }
            ]
        },
        {
            field: 'experience_years',
            errors: [
                {
                    error: 'required',
                    message: 'This field is required'
                },
                {
                    error: 'numbers',
                    message: 'This field can contain only numbers'
                },
                {
                    error: 'min',
                    message: 'This cannot be negative number'
                }
            ]
        }
    ];

    constructor(private carersService: CarersService,
                private notificationService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            email: new FormControl(null,
                [Validators.required, Validators.email],
                handleUniqueValidator(this.carersService.checkEmailUniqueness.bind(this.carersService))
            ),
            phone_number: new FormControl(null,
                [Validators.required, Validators.minLength(6), numbers],
                handleUniqueValidator(this.carersService.checkPhoneNumberUniqueness.bind(this.carersService))
            ),
            first_name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            middle_name: new FormControl('', [Validators.maxLength(100), alpha]),
            surname: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), password]),
            password_confirm: new FormControl(null, [Validators.required]),
            date_of_birth: new FormControl(null, [Validators.required, invalidDate, adult]),
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(''),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(''),
            city: new FormControl(null, Validators.required),
            jobRoleCarer: new FormControl(null),
            jobRoleSeniorCarer: new FormControl(null),
            dbs_status: new FormControl(null, ),
            dbs_ref_number: new FormControl(null, ),
            dbs_date: new FormControl(null, ),
            experience_months: new FormControl(null, [Validators.required, Validators.min(0), numbers]),
            experience_years: new FormControl(null, [Validators.required, Validators.min(0), numbers]),

            other: new FormControl(null),
            fire_safety: new FormControl(),
            dementia: new FormControl(null),
            h_and_s: new FormControl(null),
            first_aid_awareness: new FormControl(null),
            first_aid_and_basic_life_support: new FormControl(null),
            infection_control: new FormControl(null),
            medication_management: new FormControl(null),
            manual_handling_people: new FormControl(null),
            safeguarding: new FormControl(null),

            references: new FormArray([]),
            qualifications: new FormArray([])
        });

        this.form.get('password')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password_confirm').setValidators([Validators.required, equalToFieldValue(pass)]));

        this.form.get('password_confirm')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password').setValidators([Validators.required, equalToFieldValue(pass)]));

        // choosing address event from PCA
        if (pca.load) {
            pca.load();
        }

        pca.on('load', (type, id, control) => {

            control.listen('populate', (address) => {
                console.log(address);
                this.form.patchValue({
                    postal_code: address['PostalCode'],
                    company: address['Company'],
                    address_line_1: address['Line1'],
                    address_line_2: address['Line2'],
                    city: address['City']
                });
            });
        });

        // datepicker config
        const adultDate = new Date();
        adultDate.setFullYear(adultDate.getFullYear() - 18);

        $('#datepicker').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            maxDate: adultDate,
            value: moment(adultDate).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('date_of_birth').setValue(event.target['value'])
        });

        $('#dbs_date').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('dbs_date').setValue(event.target['value'])
        });

        $('#fire_safety').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('fire_safety').setValue(event.target['value'])
        });

        $('#dementia').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('dementia').setValue(event.target['value'])
        });

        $('#h_and_s').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('h_and_s').setValue(event.target['value'])
        });

        $('#first_aid_awareness').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('first_aid_awareness').setValue(event.target['value'])
        });

        $('#first_aid_and_basic_life_support').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('first_aid_and_basic_life_support').setValue(event.target['value'])
        });

        $('#infection_control').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('infection_control').setValue(event.target['value'])
        });

        $('#medication_management').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('medication_management').setValue(event.target['value'])
        });

        $('#manual_handling_people').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('manual_handling_people').setValue(event.target['value'])
        });

        $('#safeguarding').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('safeguarding').setValue(event.target['value'])
        });
    }

    onReferenceControlAdd(): void {
        (<FormArray>this.form.get('references')).push(
            new FormGroup({
                name: new FormControl(null),
                type: new FormControl(null)
            })
        );
    }

    onRemoveReferenceControl(index: number): void {
        (<FormArray>this.form.get('references')).removeAt(index);
    }

    onQualificationsControlAdd(): void {
        (<FormArray>this.form.get('qualifications')).push(
            new FormControl(null)
        );
    }

    onRemoveQualificationsControl(index: number): void {
        (<FormArray>this.form.get('qualifications')).removeAt(index);
    }

    onCreateCarer(): void {
        console.log('Carer object to create', this.prepareDataToCreate());
        this.buttonLoading = true;
        this.carersService.addCarer(this.prepareDataToCreate())
            .subscribe(
                response => {
                    console.log('Create carer response', response);
                    this.notificationService.success('Carer created');
                    this.router.navigate(['/admin', 'carers', 'details', response._id]);
                },
                error => {
                    console.log('Create carer error', error);
                    this.notificationService.error('Carer create failed, check out form');
                }
            );
    }

    onCheckForm(): void {
        console.log('Date object', new Date(this.form.get('fire_safety').value));
        console.log('Date timestamp', new Date(this.form.get('fire_safety').value).getTime());
    }

    getFormArray(field: string): FormArray {
        return (<FormArray>this.form.get(field));
    }

    private prepareDataToCreate(): any {
        return {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            phone_number: this.form.get('phone_number').value,
            address: {
                postal_code: this.form.get('postal_code').value,
                city: this.form.get('city').value,
                address_line_1: this.form.get('address_line_1').value,
                address_line_2: this.form.get('address_line_2').value,
                company: this.form.get('company').value
            },
            carer: {
                first_name: this.form.get('first_name').value,
                surname: this.form.get('surname').value,
                middle_name: this.form.get('middle_name').value,
                date_of_birth: this.form.get('date_of_birth').value,
                reference: {
                    references: this.form.get('references').value
                },
                dbs: {
                    status: this.form.get('dbs_status').value,
                    ref_number: this.form.get('dbs_ref_number').value,
                    dbs_date: new Date(this.form.get('dbs_date').value).getTime(),
                },
                joining_care_experience: {
                    months: this.form.get('experience_months').value,
                    years: this.form.get('experience_years').value
                },
                training_record: {
                    other: this.form.get('other').value,
                    fire_safety: new Date(this.form.get('fire_safety').value).getTime(),
                    dementia: new Date(this.form.get('dementia').value).getTime(),
                    h_and_s: new Date(this.form.get('h_and_s').value).getTime(),
                    first_aid_awareness: new Date(this.form.get('first_aid_awareness').value).getTime(),
                    first_aid_and_basic_life_support: new Date(this.form.get('first_aid_and_basic_life_support').value).getTime(),
                    infection_control: new Date(this.form.get('infection_control').value).getTime(),
                    medication_management: new Date(this.form.get('medication_management').value).getTime(),
                    manual_handling_people: new Date(this.form.get('manual_handling_people').value).getTime(),
                    safeguarding: new Date(this.form.get('safeguarding').value).getTime(),
                    qualifications: this.form.get('qualifications').value
                },
                eligible_roles: this.getRolesFromForm()
            },
            notes: null
        };
    }

    private getRolesFromForm(): string[] {
        const arr = [];
        if (this.form.get('jobRoleCarer').value) {
            arr.push('Carer');
        }
        if (this.form.get('jobRoleSeniorCarer').value) {
            arr.push('Senior Carer');
        }
        return arr;
    }

}
