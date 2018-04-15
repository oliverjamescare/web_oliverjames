import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {CareHomeService} from '../../../../services/care-home.service';

@Component({
    selector: 'app-care-home-home',
    templateUrl: './care-home-home.component.html',
    styleUrls: ['./care-home-home.component.scss']
})
export class CareHomeHomeComponent implements OnInit {
    dueReviews: number;

    constructor(private router: Router,
                private authService: AuthService,
                private careHomeService: CareHomeService) {
    }

    ngOnInit() {
        this.getDueReviews();
    }

    showLogoutPopup() {
        $('#logout').modal();
    }

    onLogout() {
        this.authService.logout();
        $('#logout').modal('hide').on('hidden.bs.modal', () => this.router.navigate(['/']));
    }

    getDueReviews(): void {
        this.careHomeService.getPendingReviews(1)
            .subscribe(
                response => {
                    console.log('Get due reviews seccess response', response);
                    this.dueReviews = response.results.length;
                }
            );
    }

}
