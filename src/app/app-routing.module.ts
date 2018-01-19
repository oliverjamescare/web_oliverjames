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

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'carer', component: LandingCarerComponent },
    { path: 'carer/register/terms', component: RegisterCarerTermsComponent },
    { path: 'carer/register/personal-details', component: RegisterCarerPersonalDetailsComponent },
    { path: 'carer/register/cv', component: RegisterCarerCvUploadComponent },
    { path: 'carer/register/questions-answers', component: RegisterCarerQAComponent },
    { path: 'carer/register/summary', component: RegisterCarerSummaryComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
