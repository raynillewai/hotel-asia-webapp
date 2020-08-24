import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelPackagesComponent } from './hotel-packages/hotel-packages.component';
import { HotelPackagesService } from './_services/hotel-packages.service';
import { HotelPackagesDetailsComponent } from './hotel-packages/hotel-packages-details/hotel-packages-details.component';

const routes: Routes = [
  {
    path       : '',
    component  : HomeComponent,
    resolve: {
      resolveData: HotelPackagesService,
    },
  },
  {
    path       : 'hotel-packages',
    component  : HotelPackagesComponent,
    resolve: {
      resolveData: HotelPackagesService,
    },
  },
  {
    path       : 'hotel-packages/:id',
    component  : HotelPackagesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
