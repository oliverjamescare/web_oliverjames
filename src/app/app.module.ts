//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//directives
import { ContentResizerDirective } from './directives/content-resizer.directive';

//services
import { CarerService } from './services/carer.service';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { CareHomeService } from './services/care-home.service';
import { GeneralService } from './services/general.service';
import { AuthService } from './services/auth.service';

//guards
import { CarerAuthGuardService } from './guards/carer-auth-guard.service';
import { CareHomeAuthGuardService } from './guards/care-home-auth-guard.service';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './resources/pages/home/home.component';
import { LandingCarerComponent } from './resources/pages/landing-carer/landing-carer.component';
import { HeaderComponent } from './resources/partials/header/header.component';
import { RegisterCarerTermsComponent } from './resources/pages/register-carer/register-carer-terms/register-carer-terms.component';
import { RegisterCarerPersonalDetailsComponent } from './resources/pages/register-carer/register-carer-personal-details/register-carer-personal-details.component';
import { RegisterCarerCvUploadComponent } from './resources/pages/register-carer/register-carer-cv-upload/register-carer-cv-upload.component';
import { RegisterCarerQAComponent } from './resources/pages/register-carer/register-carer-q-a/register-carer-q-a.component';
import { RegisterCarerSummaryComponent } from './resources/pages/register-carer/register-carer-summary/register-carer-summary.component';
import { RegisterCarerComponent } from './resources/pages/register-carer/register-carer.component';
import { StepperComponent } from './resources/partials/stepper/stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './resources/partials/popup/popup.component';
import { LoginComponent } from './resources/pages/login/login.component';
import { ForgotPasswordComponent } from './resources/pages/forgot-password/forgot-password.component';
import { RegisterCareHomeComponent } from './resources/pages/register-care-home/register-care-home.component';
import { ContactComponent } from './resources/pages/contact/contact.component';
import { CarerDashboardComponent } from './resources/pages/carer/carer-dashboard/carer-dashboard.component';
import { CarerHomeComponent } from './resources/pages/carer/carer-home/carer-home.component';
import { CarerMyProfileComponent } from './resources/pages/carer/carer-my-profile/carer-my-profile.component';
import { CareHomeDashboardComponent } from './resources/pages/care-home/care-home-dashboard/care-home-dashboard.component';
import { CareHomeHomeComponent } from './resources/pages/care-home/care-home-home/care-home-home.component';
import { CareHomeMyProfileComponent } from './resources/pages/care-home/care-home-my-profile/care-home-my-profile.component';
import { PasswordResetComponent } from './resources/pages/password-reset/password-reset.component';
import { EmailConfirmationComponent } from './resources/pages/email-confirmation/email-confirmation.component';

@NgModule({
    declarations: [
        ContentResizerDirective,
        AppComponent,
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
        EmailConfirmationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        ApiService,
        AuthService,
        CarerService,
        UserService,
        CareHomeService,
        GeneralService,
        CarerAuthGuardService,
        CareHomeAuthGuardService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
