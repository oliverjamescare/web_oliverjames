// core
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {HomeComponent} from './resources/pages/home/home.component';
import {LandingCarerComponent} from './resources/pages/landing-carer/landing-carer.component';
import {RegisterCarerComponent} from './resources/pages/register-carer/register-carer.component';
import {RegisterCarerTermsComponent} from './resources/pages/register-carer/register-carer-terms/register-carer-terms.component';
import {RegisterCarerSummaryComponent} from './resources/pages/register-carer/register-carer-summary/register-carer-summary.component';
import {RegisterCarerPersonalDetailsComponent} from './resources/pages/register-carer/register-carer-personal-details/register-carer-personal-details.component';
import {RegisterCarerQAComponent} from './resources/pages/register-carer/register-carer-q-a/register-carer-q-a.component';
import {RegisterCarerCvUploadComponent} from './resources/pages/register-carer/register-carer-cv-upload/register-carer-cv-upload.component';
import {RegisterCareHomeComponent} from './resources/pages/register-care-home/register-care-home.component';
import {ContactComponent} from './resources/pages/contact/contact.component';

import {CarerDashboardComponent} from './resources/pages/carer/carer-dashboard/carer-dashboard.component';
import {CarerHomeComponent} from './resources/pages/carer/carer-home/carer-home.component';
import {CarerMyProfileComponent} from './resources/pages/carer/carer-my-profile/carer-my-profile.component';

import {CareHomeDashboardComponent} from './resources/pages/care-home/care-home-dashboard/care-home-dashboard.component';
import {CareHomeHomeComponent} from './resources/pages/care-home/care-home-home/care-home-home.component';
import {CareHomeMyProfileComponent} from './resources/pages/care-home/care-home-my-profile/care-home-my-profile.component';
import {CarerAuthGuardService} from './guards/carer-auth-guard.service';
import {CareHomeAuthGuardService} from './guards/care-home-auth-guard.service';
import {PasswordResetComponent} from './resources/pages/password-reset/password-reset.component';
import {EmailConfirmationComponent} from './resources/pages/email-confirmation/email-confirmation.component';
import {WebComponent} from './web.component';
import {CareHomeBookingComponent} from './resources/pages/care-home/care-home-booking/care-home-booking.component';
import {
    CareHomeBookingNewComponent,
} from './resources/pages/care-home/care-home-booking/new-booking/care-home-booking-new.component';
import {CareHomeBookingReviewComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-review/care-home-booking-review.component';
import {CareHomeBookingPaymentDetailsComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-payment-details/care-home-booking-payment-details.component';
import {CareHomeBookingSubmitedComponent} from './resources/pages/care-home/care-home-booking/care-home-booking-submitted/care-home-booking-submited.component';
import {CarerAvailabilityComponent} from './resources/pages/carer/carer-availability/carer-availability.component';
import {CarerAvailableJobsComponent} from './resources/pages/carer/carer-available-jobs/carer-available-jobs.component';
import {ApplyForJobComponent} from './resources/pages/carer/apply-for-job/apply-for-job.component';
import {UpcomingJobsTabComponent} from './resources/pages/carer/upcoming-jobs-tab/upcoming-jobs-tab.component';
import {CareHomeUpcomingJobsTabComponent} from './resources/pages/care-home/care-home-upcoming-jobs-tab/care-home-upcoming-jobs-tab.component';
import {CareHomeJobActionsComponent} from './resources/pages/care-home/care-home-job-actions/care-home-job-actions.component';
import {CareHomeJobDetailsComponent} from './resources/pages/care-home/care-home-job-actions/care-home-job-details/care-home-job-details.component';
import {CareHomeJobEditComponent} from './resources/pages/care-home/care-home-job-actions/care-home-job-edit/care-home-job-edit.component';
import {CarerNotificationsComponent} from './resources/pages/carer/carer-notifications/carer-notifications.component';
import {CarerPaidSubmittedComponent} from './resources/pages/carer/carer-paid-submitted/carer-paid-submitted.component';
import {PaymentDetailsComponent} from './resources/pages/carer/carer-paid-submitted/payment-details/payment-details.component';
import {CareHomeReviewsComponent} from './resources/pages/care-home/care-home-reviews/care-home-reviews.component';
import {CareHomePastJobsComponent} from './resources/pages/care-home/care-home-past-jobs/care-home-past-jobs.component';
import {PastJobsDetailsComponent} from './resources/pages/care-home/care-home-past-jobs/past-jobs-details/past-jobs-details.component';
import {ChallengeJobComponent} from './resources/pages/care-home/care-home-past-jobs/challenge-job/challenge-job.component';

const routes: Routes = [
    {
        path: '', component: WebComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'contact', component: ContactComponent},
            {path: 'password-reset', component: PasswordResetComponent},
            {path: 'email-verification', component: EmailConfirmationComponent},
            {path: 'carer', component: LandingCarerComponent},
            {path: 'carer/register/terms', component: RegisterCarerTermsComponent},
            {path: 'carer/register/personal-details', component: RegisterCarerPersonalDetailsComponent},
            {path: 'carer/register/cv', component: RegisterCarerCvUploadComponent},
            {path: 'carer/register/questions-answers', component: RegisterCarerQAComponent},
            {path: 'carer/register/summary', component: RegisterCarerSummaryComponent},
            {path: 'care-home/register', component: RegisterCareHomeComponent},
            {
                path: 'carer-dashboard',
                component: CarerDashboardComponent,
                canActivate: [CarerAuthGuardService],
                children: [
                    {path: '', pathMatch: 'full', component: CarerHomeComponent},
                    {path: 'my-profile', component: CarerMyProfileComponent},
                    {path: 'contact', component: ContactComponent},
                ]
            },
            {
                path: 'carer-availability',
                component: CarerAvailabilityComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-upcoming-jobs',
                component: UpcomingJobsTabComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-available-jobs',
                component: CarerAvailableJobsComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-apply-for-job/:id',
                component: ApplyForJobComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-notifications',
                component: CarerNotificationsComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-paid-submitted',
                component: CarerPaidSubmittedComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'carer-paid-submitted-details',
                component: PaymentDetailsComponent,
                canActivate: [CarerAuthGuardService]
            },
            {
                path: 'care-home-dashboard',
                component: CareHomeDashboardComponent,
                canActivate: [CareHomeAuthGuardService],
                children: [
                    {path: '', pathMatch: 'full', component: CareHomeHomeComponent},
                    {path: 'my-profile', component: CareHomeMyProfileComponent},
                    {path: 'contact', component: ContactComponent},
                ]
            },
            {
                path: 'care-home-upcoming-jobs',
                component: CareHomeUpcomingJobsTabComponent,
                canActivate: [CareHomeAuthGuardService]
            },
            {
                path: 'care-home-job-actions/:id',
                component: CareHomeJobActionsComponent,
                canActivate: [CareHomeAuthGuardService],
                children: [
                    {path: 'details', component: CareHomeJobDetailsComponent},
                    {path: 'edit', component: CareHomeJobEditComponent},
                ]
            },
            {
                path: 'care-home-booking',
                component: CareHomeBookingComponent,
                canActivate: [CareHomeAuthGuardService],
                children: [
                    {path: 'new', component: CareHomeBookingNewComponent},
                    {path: 'review', component: CareHomeBookingReviewComponent},
                    {path: 'payment-details', component: CareHomeBookingPaymentDetailsComponent},
                    {path: 'submited', component: CareHomeBookingSubmitedComponent}
                ]
            },
            {
                path: 'care-home-reviews',
                component: CareHomeReviewsComponent,
                canActivate: [CareHomeAuthGuardService]
            },
            {
                path: 'care-home-past-jobs',
                component: CareHomePastJobsComponent,
                canActivate: [CareHomeAuthGuardService]
            },
            {
                path: 'care-home-past-jobs-details/:id',
                component: PastJobsDetailsComponent,
                canActivate: [CareHomeAuthGuardService]
            },
            {
                path: 'care-home-past-challenge-job',
                component: ChallengeJobComponent,
                canActivate: [CareHomeAuthGuardService]
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WebRoutingModule {
}
