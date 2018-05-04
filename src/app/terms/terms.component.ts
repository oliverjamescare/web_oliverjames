import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit
{
    constructor() {}

    ngOnInit()
    {
        window.location.href = environment.site + "/Terms-and-Conditions-and-Privacy-Policy.pdf";
    }

}
