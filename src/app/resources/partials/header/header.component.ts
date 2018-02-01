import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adult, alpha, equalTo, greaterThan, invalidDate, numbers, password } from '../../../utilities/validators';
import { handleUniqueValidator, handleValidationErrorMessage, handleValidationStateClass } from '../../../utilities/form.utils';

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
    form: FormGroup

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit()
    {
        //form config
        this.form = new FormGroup({
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(""),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(""),
            city: new FormControl(null, Validators.required )
        });

        //activated module handle
        this.router.events.subscribe(() => {
            if(this.router.url == "/" || this.router.url == "/contact")
                this.activatedModule = "careHomeRegister";
            else if(this.router.url == "/carer")
                this.activatedModule = "carer";
            else
                this.activatedModule = "slim";

            this.loggedUser = this.authService.getLoggedUser();
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

    openCarerLogin()
    {
        this.carerLoginTriggered.emit(true);
    }
    openCareHomeLogin()
    {
        this.careHomeLoginTriggered.emit(true);
    }
}
