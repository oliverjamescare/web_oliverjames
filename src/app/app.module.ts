//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//directives
import { ContentResizerDirective } from './directives/content-resizer.directive';

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
        StepperComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
