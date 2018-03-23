import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    options = {
        timeOut: 2500,
        showProgressBar: false
    };
}
