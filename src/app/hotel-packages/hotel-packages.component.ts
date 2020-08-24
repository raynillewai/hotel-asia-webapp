import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute, } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { HotelPackages } from '../_models/hotel-packages.model';
import { ThrowStmt } from '@angular/compiler';
import { HotelPackagesService } from '../_services/hotel-packages.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

declare var swal: any;
declare let withForm:any 

@Component({
  selector: 'app-hotel-packages',
  templateUrl: './hotel-packages.component.html',
  styleUrls: ['./hotel-packages.component.css']
})
export class HotelPackagesComponent implements OnInit {
  hotelPackagesList: HotelPackages[] = [];
  hotelDetailsForm: any;
  genNumbers: any[] = [];
  genValidity: number[] = [7, 30, 60, 90, 120, 365];
  selectedDuration: number;
  selectedPackageValidity: number;
  description: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private _hotelPackagesService: HotelPackagesService, public ngxSmartModalService: NgxSmartModalService) { 
    for (let i = 2; i <= 10; i++) {
      this.genNumbers.push(i);
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data.resolveData);
    this.hotelPackagesList = this.route.snapshot.data.resolveData;
    this.initForm();
    // this.hotelPackagesList = this.route.data.subscribe(data => {
    //   console.log(data);
    //   return data;
    // });
  }

  gotoDetails(data) {
    console.log(data);
    this.router.navigate(['/hotel-packages/'+data.id]);
  }

  createForm() {
    console.log(this.hotelDetailsForm.get('price').value);
    this.hotelDetailsForm.patchValue({
      durationOfStay: +this.selectedDuration,
      packageValidity: +this.selectedPackageValidity,
      description: this.description
    });
    this._hotelPackagesService.create(this.hotelDetailsForm.value)
      .subscribe(response => {
        console.log(response);
        this.ngxSmartModalService.closeAll();
        this.toastr.info('Redirecting..', 'Details Updated');
        this.redirectTo('/hotel-packages/');
      });
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  initForm() {
    this.hotelDetailsForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      price: [0.00, Validators.required],
      durationOfStay: [0, Validators.required],
      packageValidity: [0, Validators.required],
      description: ['', Validators.required]
    });
  }


}
