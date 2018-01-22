import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: [ './stepper.component.scss' ]
})
export class StepperComponent
{
    @Input() steps: Array<{ name: string, active: boolean, completed: boolean }> = [];
    constructor() {}
}
