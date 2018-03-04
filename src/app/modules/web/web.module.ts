// core
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WebRoutingModule} from './web-routing.module';

// directives
import {ContentResizerDirective} from './directives/content-resizer.directive';

// services
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {CarerAuthService} from './services/carer-auth.service';
import {UserService} from './services/user.service';
import {GeneralService} from './services/general.service';
import {CareHomeService} from './services/care-home.service';

// guards
import {CarerAuthGuardService} from './guards/carer-auth-guard.service';
import {CareHomeAuthGuardService} from './guards/care-home-auth-guard.service';

// components
import {WebComponent} from './web.component';
import {EmailConfirmationComponent} from './resources/pages/email-confirmation/email-confirmation.component';
import {PasswordResetComponent} from './resources/pages/password-reset/password-reset.component';
import {CareHomeMyProfileComponent} from './resources/pages/care-home/care-home-my-profile/care-home-my-profile.component';
import {CareHomeHomeComponent} from './resources/pages/care-home/care-home-home/care-home-home.component';
import {CareHomeDashboardComponent} from './resources/pages/care-home/care-home-dashboard/care-home-dashboard.component';
import {CarerMyProfileComponent} from './resources/pages/carer/carer-my-profile/carer-my-profile.component';
import {CarerHomeComponent} from './resources/pages/carer/carer-home/carer-home.component';
import {CarerDashboardComponent} from './resources/pages/carer/carer-dashboard/carer-dashboard.component';
import {ContactComponent} from './resources/pages/contact/contact.component';
import {RegisterCareHomeComponent} from './resources/pages/register-care-home/register-care-home.component';
import {ForgotPasswordComponent} from './resources/pages/forgot-password/forgot-password.component';
import {LoginComponent} from './resources/pages/login/login.component';
import {PopupComponent} from './resources/partials/popup/popup.component';
import {StepperComponent} from './resources/partials/stepper/stepper.component';
import {RegisterCarerComponent} from './resources/pages/register-carer/register-carer.component';
import {RegisterCarerSummaryComponent} from './resources/pages/register-carer/register-carer-summary/register-carer-summary.component';
import {RegisterCarerQAComponent} from './resources/pages/register-carer/register-carer-q-a/register-carer-q-a.component';
import {RegisterCarerCvUploadComponent} from './resources/pages/register-carer/register-carer-cv-upload/register-carer-cv-upload.component';
import {RegisterCarerPersonalDetailsComponent} from './resources/pages/register-carer/register-carer-personal-details/register-carer-personal-details.component';
import {RegisterCarerTermsComponent} from './resources/pages/register-carer/register-carer-terms/register-carer-terms.component';
import {HeaderComponent} from './resources/partials/header/header.component';
import {LandingCarerComponent} from './resources/pages/landing-carer/landing-carer.component';
import {HomeComponent} from './resources/pages/home/home.component';
import {CareHomeBookingComponent} from './resources/pages/care-home/care-home-booking/care-home-booking.component';
import {
    CareHomeBookingNewComponent
} from './resources/pages/care-home/care-home-booking/new-booking/care-home-booking-new.component';
import {CareHomeBookingHeaderComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-header/care-home-booking-header.component';
import {CareHomeBookingReviewComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-review/care-home-booking-review.component';
import {CareHomeBookingSubmitedComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-submitted/care-home-booking-submited.component';
import {CareHomeBookingPaymentDetailsComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-payment-details/care-home-booking-payment-details.component';
import {BookingCalendarComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/booking-calendar.component';
import {CareHomeBookingService} from './services/care-home-booking.service';
import {CalendarDayComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-day/calendar-day.component';
import {DayLabelRowComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/day-label-row/day-label-row.component';
import {MonthLabelComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/month-label/month-label.component';
import {CalendarCellComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-cell/calendar-cell.component';
import {CalendarPopupComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-popup/calendar-popup.component';
import {CalendarPopupService} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-popup/calendar-popup.service';
import {HourPipe} from './pipes/hour.pipe';
import {DatePipe} from './pipes/date.pipe';
import {DayJobsListComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-day/day-jobs-list/day-jobs-list.component';
import {BookingSearchComponent} from './resources/pages/care-home/care-home-booking/new-booking/booking-search/booking-search.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {PriorityCarersListComponent} from './resources/pages/care-home/care-home-booking/new-booking/priority-carers-list/priority-carers-list.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ReviewTableComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-review/review-table/review-table.component';
import {PreferenceTabComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-review/preference-tab/preference-tab.component';
import {GeneralGuidanceComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-review/genral-guidance/genral-guidance.component';
import {CalendarPopupListComponent} from './resources/pages/care-home/care-home-booking/booking-calendar/calendar-popup-list/calendar-popup-list.component';
import {UpcomingJobsComponent} from './resources/pages/carer/upcoming-jobs/upcoming-jobs.component';
import {CarerJobService} from './services/carer-job.service';
import {CarerAvailabilityComponent} from './resources/pages/carer/carer-availability/carer-availability.component';
import {DatesService} from './services/dates.service';
import {FakeApiService} from './services/fake-api.service';
import {CarerAvailableJobsComponent} from './resources/pages/carer/carer-available-jobs/carer-available-jobs.component';
import {CarerProfileService} from './services/carer-profile.service';
import { ChangePasswordComponent } from './resources/pages/carer/carer-my-profile/change-password/change-password.component';
import { ChangeEmailComponent } from './resources/pages/carer/carer-my-profile/change-email/change-email.component';

@NgModule({
    declarations: [
        WebComponent,
        ContentResizerDirective,
        HomeComponent,
        LandingCarerComponent,
        HeaderComponent,
        RegisterCarerTermsComponent,
        RegisterCarerPersonalDetailsComponent,
        RegisterCarerCvUploadComponent,
        RegisterCarerQAComponent,
        RegisterCarerSummaryComponent,
        RegisterCarerComponent,
        StepperComponent,
        PopupComponent,
        LoginComponent,
        ForgotPasswordComponent,
        RegisterCareHomeComponent,
        ContactComponent,
        CarerDashboardComponent,
        CarerHomeComponent,
        CarerMyProfileComponent,
        CareHomeDashboardComponent,
        CareHomeHomeComponent,
        CareHomeMyProfileComponent,
        PasswordResetComponent,
        EmailConfirmationComponent,
        CareHomeBookingComponent,
        CareHomeBookingHeaderComponent,
        CareHomeBookingNewComponent,
        CareHomeBookingReviewComponent,
        CareHomeBookingPaymentDetailsComponent,
        CareHomeBookingSubmitedComponent,
        BookingCalendarComponent,
        CalendarDayComponent,
        DayLabelRowComponent,
        MonthLabelComponent,
        CalendarCellComponent,
        CalendarPopupComponent,
        HourPipe,
        DatePipe,
        DayJobsListComponent,
        BookingSearchComponent,
        PriorityCarersListComponent,
        ReviewTableComponent,
        PreferenceTabComponent,
        GeneralGuidanceComponent,
        CalendarPopupListComponent,
        UpcomingJobsComponent,
        CarerAvailabilityComponent,
        CarerAvailableJobsComponent,
        ChangePasswordComponent,
        ChangeEmailComponent
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
        MatAutocompleteModule,
        MatInputModule,
        ClickOutsideModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [
        ApiService,
        AuthService,
        CarerAuthService,
        UserService,
        CareHomeService,
        GeneralService,
        CarerAuthGuardService,
        CareHomeAuthGuardService,
        CareHomeBookingService,
        CalendarPopupService,
        CarerJobService,
        DatesService,
        FakeApiService,
        CarerJobService,
        CarerProfileService
    ]
})
export class WebModule {
}
