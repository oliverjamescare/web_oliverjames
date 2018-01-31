import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

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
    loggedUser: User

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit()
    {
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
