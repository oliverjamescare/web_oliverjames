import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register-care-home',
    templateUrl: './register-care-home.component.html',
    styleUrls: [ './register-care-home.component.scss' ]
})
export class RegisterCareHomeComponent implements OnInit
{
    addressVisible = false;
    constructor() { }

    ngOnInit()
    {
    }

    toggleAddress()
    {
        this.addressVisible = !this.addressVisible;
    }

}
