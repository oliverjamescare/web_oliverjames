//core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//custom modules
import { AppRoutingModule } from './app-routing.module';
import { WebModule } from './modules/web/web.module';
import { CmsModule } from './modules/cms/cms.module';

//components
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        WebModule,
        CmsModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
