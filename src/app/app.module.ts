//core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//custom modules
import { AppRoutingModule } from './app-routing.module';
import { WebModule } from './modules/web/web.module';
import { CmsModule } from './modules/cms/cms.module';

//components
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from './modules/shared/shared.module';
import { TermsComponent } from './terms/terms.component';


@NgModule({
    declarations: [
        AppComponent,
        TermsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        WebModule,
        CmsModule,
        SimpleNotificationsModule.forRoot(),
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
