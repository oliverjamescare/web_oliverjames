// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';

// directives
import { ContentResizerDirective } from './directives/content-resizer.directive';

// services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { CarerService } from './services/carer.service';
import { UserService } from './services/user.service';
import { GeneralService } from './services/general.service';
import { CareHomeService } from './services/care-home.service';

// guards
import { CarerAuthGuardService } from './guards/carer-auth-guard.service';
import { CareHomeAuthGuardService } from './guards/care-home-auth-guard.service';

// components
import { WebComponent } from './web.component';
import { EmailConfirmationComponent } from './resources/pages/email-confirmation/email-confirmation.component';
import { PasswordResetComponent } from './resources/pages/password-reset/password-reset.component';
import { CareHomeMyProfileComponent } from './resources/pages/care-home/care-home-my-profile/care-home-my-profile.component';
import { CareHomeHomeComponent } from './resources/pages/care-home/care-home-home/care-home-home.component';
import { CareHomeDashboardComponent } from './resources/pages/care-home/care-home-dashboard/care-home-dashboard.component';
import { CarerMyProfileComponent } from './resources/pages/carer/carer-my-profile/carer-my-profile.component';
import { CarerHomeComponent } from './resources/pages/carer/carer-home/carer-home.component';
import { CarerDashboardComponent } from './resources/pages/carer/carer-dashboard/carer-dashboard.component';
import { ContactComponent } from './resources/pages/contact/contact.component';
import { RegisterCareHomeComponent } from './resources/pages/register-care-home/register-care-home.component';
import { ForgotPasswordComponent } from './resources/pages/forgot-password/forgot-password.component';
import { LoginComponent } from './resources/pages/login/login.component';
import { PopupComponent } from './resources/partials/popup/popup.component';
import { StepperComponent } from './resources/partials/stepper/stepper.component';
import { RegisterCarerComponent } from './resources/pages/register-carer/register-carer.component';
import { RegisterCarerSummaryComponent } from './resources/pages/register-carer/register-carer-summary/register-carer-summary.component';
import { RegisterCarerQAComponent } from './resources/pages/register-carer/register-carer-q-a/register-carer-q-a.component';
import { RegisterCarerCvUploadComponent } from './resources/pages/register-carer/register-carer-cv-upload/register-carer-cv-upload.component';
import { RegisterCarerPersonalDetailsComponent } from './resources/pages/register-carer/register-carer-personal-details/register-carer-personal-details.component';
import { RegisterCarerTermsComponent } from './resources/pages/register-carer/register-carer-terms/register-carer-terms.component';
import { HeaderComponent } from './resources/partials/header/header.component';
import { LandingCarerComponent } from './resources/pages/landing-carer/landing-carer.component';
import { HomeComponent } from './resources/pages/home/home.component';
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
        MonthLabelComponent
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        ApiService,
        AuthService,
        CarerService,
        UserService,
        CareHomeService,
        GeneralService,
        CarerAuthGuardService,
        CareHomeAuthGuardService,
        CareHomeBookingService
    ]
})
export class WebModule {}
