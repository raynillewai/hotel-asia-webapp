import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HotelPackagesComponent } from './hotel-packages/hotel-packages.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HotelPackagesService } from './_services/hotel-packages.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HotelPackagesDetailsComponent } from './hotel-packages/hotel-packages-details/hotel-packages-details.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HotelPackagesDetailsComponent,
    HotelPackagesComponent,
    FooterComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    NgxSmartModalModule.forRoot()
  ],
  providers: [HotelPackagesService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
