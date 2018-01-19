import { Component, OnInit } from '@angular/core';
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
}
