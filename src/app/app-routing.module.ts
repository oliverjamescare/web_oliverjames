//core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { HomeComponent } from './resources/pages/home/home.component';
import { LandingCarerComponent } from './resources/pages/landing-carer/landing-carer.component';
import { RegisterCarerComponent } from './resources/pages/register-carer/register-carer.component';
import { RegisterCarerTermsComponent } from './resources/pages/register-carer/register-carer-terms/register-carer-terms.component';
import { RegisterCarerSummaryComponent } from './resources/pages/register-carer/register-carer-summary/register-carer-summary.component';
import { RegisterCarerPersonalDetailsComponent } from './resources/pages/register-carer/register-carer-personal-details/register-carer-personal-details.component';
import { RegisterCarerQAComponent } from './resources/pages/register-carer/register-carer-q-a/register-carer-q-a.component';
import { RegisterCarerCvUploadComponent } from './resources/pages/register-carer/register-carer-cv-upload/register-carer-cv-upload.component';
import { RegisterCareHomeComponent } from './resources/pages/register-care-home/register-care-home.component';
import { ContactComponent } from './resources/pages/contact/contact.component';

import { CarerDashboardComponent } from './resources/pages/carer/carer-dashboard/carer-dashboard.component';
import { CarerHomeComponent } from './resources/pages/carer/carer-home/carer-home.component';
import { CarerMyProfileComponent } from './resources/pages/carer/carer-my-profile/carer-my-profile.component';

import { CareHomeDashboardComponent } from './resources/pages/care-home/care-home-dashboard/care-home-dashboard.component';
import { CareHomeHomeComponent } from './resources/pages/care-home/care-home-home/care-home-home.component';
import { CareHomeMyProfileComponent } from './resources/pages/care-home/care-home-my-profile/care-home-my-profile.component';
import { CarerAuthGuardService } from './guards/carer-auth-guard.service';
import { CareHomeAuthGuardService } from './guards/care-home-auth-guard.service';
import { PasswordResetComponent } from './resources/pages/password-reset/password-reset.component';
import { EmailConfirmationComponent } from './resources/pages/email-confirmation/email-confirmation.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'email-verification', component: EmailConfirmationComponent },
    { path: 'carer', component: LandingCarerComponent },
    { path: 'carer/register/terms', component: RegisterCarerTermsComponent },
    { path: 'carer/register/personal-details', component: RegisterCarerPersonalDetailsComponent },
    { path: 'carer/register/cv', component: RegisterCarerCvUploadComponent },
    { path: 'carer/register/questions-answers', component: RegisterCarerQAComponent },
    { path: 'carer/register/summary', component: RegisterCarerSummaryComponent },
    { path: 'care-home/register', component: RegisterCareHomeComponent },
    {
        path: 'carer-dashboard',
        component: CarerDashboardComponent,
        canActivate: [ CarerAuthGuardService ],
        children: [
            { path: '', pathMatch: 'full', component: CarerHomeComponent },
            { path: 'my-profile', component: CarerMyProfileComponent },
            { path: 'contact', component: ContactComponent },
        ]
    },
    {
        path: 'care-home-dashboard',
        component: CareHomeDashboardComponent,
        canActivate: [ CareHomeAuthGuardService ],
        children: [
            { path: '', pathMatch: 'full', component: CareHomeHomeComponent },
            { path: 'my-profile', component: CareHomeMyProfileComponent },
            { path: 'contact', component: ContactComponent },
        ]
    },
    { path: '**', redirectTo: "/"}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
