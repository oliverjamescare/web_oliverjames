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
import {ChangePasswordComponent} from './resources/pages/carer/carer-my-profile/change-password/change-password.component';
import {ChangeEmailComponent} from './resources/pages/carer/carer-my-profile/change-email/change-email.component';
import {ChangeProfileImageComponent} from './resources/pages/carer/carer-my-profile/change-profile-image/change-profile-image.component';
import {ApplyForJobComponent} from './resources/pages/carer/apply-for-job/apply-for-job.component';
import {CarerCalendarComponent} from './resources/pages/carer/apply-for-job/carer-calendar/carer-calendar.component';
import {CarerCalendarCellComponent} from './resources/pages/carer/apply-for-job/carer-calendar/carer-calendar-cell/carer-calendar-cell.component';
import {CarerCalendarDayComponent} from './resources/pages/carer/apply-for-job/carer-calendar/carer-calendar-cell/carer-calendar-day/carer-calendar-day.component';
import {CarerCalendarPopupComponent} from './resources/pages/carer/apply-for-job/carer-calendar/carer-calendar-cell/carer-calendar-day/carer-calendar-popup/carer-calendar-popup.component';
import {JobDetailsComponent} from './resources/pages/carer/apply-for-job/job-details/job-details.component';
import {ConfirmationPopupComponent} from './resources/pages/carer/apply-for-job/job-details/confirmation-popup/confirmation-popup.component';
import {OtherJobsComponent} from './resources/pages/carer/apply-for-job/other-jobs/other-jobs.component';
import {AgmCoreModule} from '@agm/core';
import {CardDetailsComponent} from './resources/pages/carer/carer-my-profile/card-details/card-details.component';
import {NgxStripeModule} from 'ngx-stripe';
import {UpcomingJobsTabComponent} from './resources/pages/carer/upcoming-jobs-tab/upcoming-jobs-tab.component';
import {CarerJobListComponent} from './resources/pages/carer/apply-for-job/carer-calendar/carer-calendar-cell/carer-calendar-day/carer-job-list/carer-job-list.component';
import {LoadingService} from './services/loading.service';
import {GoogleService} from './services/google.service';
import {CareHomeUpcomingJobsComponent} from './resources/pages/care-home/care-home-upcoming-jobs/care-home-upcoming-jobs.component';
import {TimestampHourPipe} from './pipes/timestampHour.pipe';
import {TimestampDatePipe} from './pipes/timstampDate.pipe';
import { BlockedCarersComponent } from './resources/pages/care-home/care-home-my-profile/blocked-carers/blocked-carers.component';
import { CareHomeUpcomingJobsTabComponent } from './resources/pages/care-home/care-home-upcoming-jobs-tab/care-home-upcoming-jobs-tab.component';
import { CareHomeJobActionsComponent } from './resources/pages/care-home/care-home-job-actions/care-home-job-actions.component';
import { CareHomeJobDetailsComponent } from './resources/pages/care-home/care-home-job-actions/care-home-job-details/care-home-job-details.component';
import { CareHomeJobEditComponent } from './resources/pages/care-home/care-home-job-actions/care-home-job-edit/care-home-job-edit.component';
import { WarningPopupComponent } from './resources/pages/care-home/care-home-job-actions/care-home-job-edit/warning-popup/warning-popup.component';
import { CancelationPopupComponent } from './resources/pages/care-home/care-home-job-actions/care-home-job-details/cancelation-popup/cancelation-popup.component';
import { CareHomeCarerDetailsComponent } from './resources/pages/care-home/care-home-job-actions/care-home-carer-details/care-home-carer-details.component';
import { CarerNotificationsComponent } from './resources/pages/carer/carer-notifications/carer-notifications.component';
import {CarerService} from './services/carer.service';
import { CarerPaidSubmittedComponent } from './resources/pages/carer/carer-paid-submitted/carer-paid-submitted.component';
import { PaymentDetailsComponent } from './resources/pages/carer/carer-paid-submitted/payment-details/payment-details.component';

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
        ChangeEmailComponent,
        ChangeProfileImageComponent,
        ApplyForJobComponent,
        CarerCalendarComponent,
        CarerCalendarCellComponent,
        CarerCalendarDayComponent,
        CarerCalendarPopupComponent,
        JobDetailsComponent,
        ConfirmationPopupComponent,
        OtherJobsComponent,
        CardDetailsComponent,
        UpcomingJobsTabComponent,
        CarerJobListComponent,
        PopupComponent,
        CareHomeUpcomingJobsComponent,
        TimestampHourPipe,
        TimestampDatePipe,
        BlockedCarersComponent,
        CareHomeUpcomingJobsTabComponent,
        CareHomeJobActionsComponent,
        CareHomeJobDetailsComponent,
        CareHomeJobEditComponent,
        WarningPopupComponent,
        CancelationPopupComponent,
        CareHomeCarerDetailsComponent,
        CarerNotificationsComponent,
        CarerPaidSubmittedComponent,
        PaymentDetailsComponent
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
        MatInputModule,
        ClickOutsideModule,
        NgxStripeModule.forRoot('pk_test_sihAGUNVJG3EsvgRyh7IHDQo'),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBWoEhh2-9yp52XVTtfTaLIPcxcmTkt_Ms',
            libraries: ['places', 'geometry']
        })
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
        CarerProfileService,
        LoadingService,
        GoogleService,
        CarerService
    ]
})
export class WebModule {
}
