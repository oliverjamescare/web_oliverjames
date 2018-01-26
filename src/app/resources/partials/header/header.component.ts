import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
    modules: [ string ] = ["careHomeRegister", "careHomeWaitingListForm", "carer", "slim"];
    activatedModule: string = this.modules[0];
    @Output() carerLoginTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() careHomeLoginTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit()
    {
        //activated module handle
        this.router.events.subscribe(() => {
            if(this.router.url == "/")
                this.activatedModule = "careHomeRegister";
            else if(this.router.url == "/carer")
                this.activatedModule = "carer";
            else
                this.activatedModule = "slim";
        })
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
