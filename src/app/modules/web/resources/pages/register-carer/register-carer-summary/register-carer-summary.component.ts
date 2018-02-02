import { Component} from '@angular/core';

@Component({
    selector: 'app-register-carer-summary',
    templateUrl: './register-carer-summary.component.html',
    styleUrls: [ './register-carer-summary.component.scss' ]
})
export class RegisterCarerSummaryComponent
{
    steps: Array<{ name: string, active: boolean, completed: boolean }> = [
        {
            name: "Terms & Conditions",
            active: true,
            completed: true
        },
        {
            name: "Personal details",
            active: true,
            completed: true
        },
        {
            name: "CV upload",
            active: true,
            completed: true
        },
        {
            name: "Q&A",
            active: true,
            completed: true
        }
    ];
}
