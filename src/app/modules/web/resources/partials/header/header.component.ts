import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adult, alpha, equalTo, greaterThan, invalidDate, numbers, password } from '../../../../../utilities/validators';
import {
    getMessageError, handleUniqueValidator, handleValidationErrorMessage,
    handleValidationStateClass
} from '../../../../../utilities/form.utils';
import { CareHomeService } from '../../../services/care-home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
    modules: [ string ] = ["careHomeRegister", "careHomeAddToWaitingList", "carer", "slim"];
    activatedModule: string = this.modules[0];
    @Output() carerLoginTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() careHomeLoginTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();
    loggedUser: User;

    //form config
    form: FormGroup;
    waitingForm: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress: boolean = false;
    error: string = "";

    waitingFormMessages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: "Email is required"
                },
                {
                    error: 'email',
                    message: "This is not a valid email address"
                }
            ]
        },
        {
            field: 'name',
            errors: [
                {
                    error: 'required',
                    message: "Name is required"
                },
                {
                    error: 'maxlength',
                    message: "Name cannot be longer than 100 characters"
                },
                {
                    error: 'alpha',
                    message: "Name can contain only alphabetical characters"
                }
            ]
        },
        {
            field: 'postal_code',
            errors: [
                {
                    error: 'required',
                    message: "Postcode is required"
                }
            ]
        },
    ];

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private careHomeService: CareHomeService) {}

    ngOnInit()
    {
        //activated module handle
        this.handleModules(this.router.url);
        this.router.events.subscribe(() => this.handleModules(this.router.url));

        //address form config
        this.form = new FormGroup({
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(""),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(""),
            city: new FormControl(null, Validators.required )
        });

        //waiting list form
        this.waitingForm = new FormGroup({
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(""),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(""),
            city: new FormControl(null, Validators.required ),
            email: new FormControl(null,[ Validators.required, Validators.email ]),
            name: new FormControl(null,[ Validators.required, Validators.maxLength(100), alpha ]),
        });

        this.authService.authChanged.subscribe((user: User) => this.loggedUser = user);

        //choosing address event from PCA
        pca.on("load", (type, id, control) => {
            control.listen('populate', (address) => {
                console.log(address)
                this.form.patchValue({
                    postal_code: address['PostalCode'],
                    company: address["Company"],
                    address_line_1: address["Line1"],
                    address_line_2: address["Line2"],
                    city: address["City"]
                });
            })
        });
    }

    onCheckCarersNearby()
    {
        if(this.form.valid)
        {
            this.careHomeService
                .checkCarersNearby(this.form.value)
                .subscribe((result) => {

                    console.log(result);
                    if(result["exists"])
                    {
                        this.careHomeService.addressForm = this.form.value;
                        this.router.navigate(["care-home","register"])
                    }
                    else
                    {
                        this.waitingForm.patchValue(this.form.value);
                        this.activatedModule = "careHomeAddToWaitingList";
                    }
                    this.form.reset();
                });
        }
    }

    onAddToWaitingList()
    {
        if(this.waitingForm.valid)
        {
            this.inProgress = true;
            this.careHomeService
                .addCareHomeToWaitingList(this.waitingForm.value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.waitingForm.reset();
                        this.activatedModule = "careHomeRegister";
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    openCarerLogin()
    {
        this.carerLoginTriggered.emit(true);
    }
    openCareHomeLogin()
    {
        this.careHomeLoginTriggered.emit(true);
    }

    handleModules(url: string)
    {
        if(url == "/" || url == "/contact")
            this.activatedModule = "careHomeRegister";
        else if(url == "/carer")
            this.activatedModule = "carer";
        else
            this.activatedModule = "slim";

        this.loggedUser = this.authService.getLoggedUser();
    }
}
