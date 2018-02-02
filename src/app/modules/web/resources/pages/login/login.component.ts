import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarerService } from '../../../services/carer.service';
import { getMessageError } from '../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { CareHomeService } from '../../../services/care-home.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, AfterViewInit
{
    @Input() type: string;
    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() forgotPasswordTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();

    title: string;
    inProgress: boolean = false;
    error: string = "";

    constructor(private carerService: CarerService, private careHomeService: CareHomeService, private router: Router) { }

    ngOnInit()
    {
        this.title = this.type == "carer" ? "Carer login" : "Care home login";
    }

    ngAfterViewInit()
    {
        $("#" + this.type + "_id").modal();
        $("#" + this.type + "_id").on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onLogin(form: NgForm)
    {
        if(this.type == "carer")
        {
            this.inProgress = true;
            this.carerService
                .loginCarer(form.value.email, form.value.password)
                .subscribe(() => {
                        this.inProgress = false;
                        $("#" + this.type + "_id").modal("hide");
                        this.router.navigate(["/carer-dashboard"]);

                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });
        }
        else if(this.type == "careHome")
        {
            this.inProgress = true;
            this.careHomeService
                .loginCareHome(form.value.email, form.value.password)
                .subscribe(() => {
                        this.inProgress = false;
                        $("#" + this.type + "_id").modal("hide");
                        this.router.navigate(["/care-home-dashboard"]);
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    onForgotPasswordInit()
    {
        $("#" + this.type + "_id")
            .modal("hide")
            .on('hidden.bs.modal', () => this.forgotPasswordTriggered.emit(true));
    }
}
