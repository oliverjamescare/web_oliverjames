import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareHomesService } from '../../../../services/care-homes.service';
import { User } from '../../../../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { getMessageError } from '../../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { DatesService } from '../../../../services/dates.service';

@Component({
    selector: 'app-care-home-details',
    templateUrl: './care-home-details.component.html',
    styleUrls: ['./care-home-details.component.scss']
})
export class CareHomeDetailsComponent implements OnInit
{
    careHome: User;
    form: FormGroup;
    creditsForm: FormGroup;
    token: string;
    error: string = "";
    modalError: string = "";
    inProgress: boolean = false;
    id: string;


    constructor( private route: ActivatedRoute, private careHomesService: CareHomesService, private authService: AuthService, public datesService: DatesService) {}

    ngOnInit()
    {
        this.token = this.authService.getAccessToken();
        this.route
            .params
            .subscribe(params => {
                    this.id = params['id'];
                    this.loadCareHome()
                }
            );

        //this.loadPca();

        //form credits init
        this.creditsForm = new FormGroup({
            amount: new FormControl(""),
            type: new FormControl(""),
            description: new FormControl("")
        })
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.careHomesService
                .updateCareHomeDetails(this.careHome.id, this.form)
                .subscribe(() => {
                        this.error = "";
                        this.inProgress = false;
                        this.loadCareHome()
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    //credits handle
    addCredits()
    {
        $("#credits").modal();
    }
    onAddCredits()
    {
        if(this.creditsForm.valid)
        {
            this.careHomesService
                .addCredits(this.id, this.creditsForm.value)
                .subscribe(() => {
                        $("#credits").modal("hide");
                        this.modalError = "";
                        this.creditsForm.reset();
                        this.loadCareHome();
                    },
                    (error: HttpErrorResponse) => {
                        this.modalError = getMessageError(error);
                    });
        }
    }

    private loadPca(): void
    {
        if (pca.load) {
            pca.load();
        }

        pca.on('load', (type, id, control) => {
            control.listen('populate', (address) => {
                console.log(address);
                this.form.patchValue({
                    postal_code: address['PostalCode'],
                    address_line_1: address['Line1'],
                    address_line_2: address['Line2'],
                    city: address['City'],
                    company: address['Company'],
                });
            });
        });
    }

    loadCareHome()
    {
        this.careHomesService
            .getCareHome(this.id)
            .subscribe((careHome: User) => {
                this.careHome = careHome;

                //form init
                this.form = new FormGroup({
                    notes: new FormControl(this.careHome.notes),
                    status: new FormControl(this.careHome.status),
                    banned_until: new FormControl(this.careHome.banned_until ? this.datesService.getDateString(this.careHome.banned_until) : ""),
                    care_service_name: new FormControl(this.careHome.care_home.care_service_name),
                    type_of_home: new FormControl(this.careHome.care_home.type_of_home),
                    name: new FormControl(this.careHome.care_home.name),
                    gender_preference: new FormControl(this.careHome.care_home.gender_preference),
                    floor_plan: new FormControl(null),
                    parking: new FormControl(this.careHome.care_home.general_guidance.parking),
                    notes_for_carers: new FormControl(this.careHome.care_home.general_guidance.notes_for_carers),
                    emergency_guidance: new FormControl(this.careHome.care_home.general_guidance.emergency_guidance),
                    report_contact: new FormControl(this.careHome.care_home.general_guidance.report_contact),
                    superior_contact: new FormControl(this.careHome.care_home.general_guidance.superior_contact),
                    postal_code: new FormControl(this.careHome.address.postal_code),
                    company: new FormControl(this.careHome.address.company),
                    address_line_1: new FormControl(this.careHome.address.address_line_1),
                    address_line_2: new FormControl(this.careHome.address.address_line_2),
                    city: new FormControl(this.careHome.address.city),
                })
            });
    }

}
