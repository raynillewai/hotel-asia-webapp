import { Component, OnInit } from '@angular/core';
import { HotelPackagesService } from 'src/app/_services/hotel-packages.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-hotel-packages-details',
  templateUrl: './hotel-packages-details.component.html',
  styleUrls: ['./hotel-packages-details.component.css'],
})
export class HotelPackagesDetailsComponent implements OnInit {

  hotelPackageDetail: any = {};
  isEditable: boolean = false;
  hotelDetailsForm: any;
  description: string = '';
  genNumbers: any[] = [];
  genValidity: number[] = [7, 30, 60, 90, 120, 365];
  selectedDuration: number;
  selectedPackageValidity: number;

  constructor(private _hotelPackagesService: HotelPackagesService, private formBuilder: FormBuilder, private route: Router, private router: ActivatedRoute, private toastr: ToastrService) { 
    for (let i = 2; i <= 10; i++) {
      this.genNumbers.push(i);
    }
    // this.genNumbers = new Array(100).fill().map((x,i)=>i);
  }

  ngOnInit(): void {
    this.initForm();
    // this.hotelPackageDetail = this._hotelPackagesService.appendData;
    this.loadDetails();
  }

  loadDetails() {
    this._hotelPackagesService.getHotelPackage(this.router.snapshot.params.id)
    .subscribe(response => {
      this.hotelPackageDetail = response;
      console.log(this.hotelPackageDetail);
    });
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

  showUpdate() {
    this.hotelDetailsForm.patchValue({
      hotelName: this.hotelPackageDetail.hotelName,
      price: parseFloat(this.hotelPackageDetail.price).toFixed(2),
      durationOfStay: this.hotelPackageDetail.durationOfStay,
      packageValidity: this.hotelPackageDetail.packageValidity,
      description: this.hotelPackageDetail.description
    });
    this.selectedDuration = this.hotelPackageDetail.durationOfStay;
    this.selectedPackageValidity = this.hotelPackageDetail.packageValidity;
    this.description =  this.hotelPackageDetail.description;
    this.isEditable = !this.isEditable;
  }

  showDelete() {
    Swal.fire({
      title: 'DELETE',
      text: "Do you want to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log('deleting');
        this._hotelPackagesService.delete(this.router.snapshot.params.id)
        .subscribe(response => {
          this.toastr.info('Redirecting..', 'Listing Deleted');
          this.route.navigate(['/hotel-packages/']); 
        });
      }
    })
  }

  updateForm() {
    this.hotelDetailsForm.patchValue({ packageValidity: +this.selectedPackageValidity });
    this.hotelDetailsForm.patchValue({ durationOfStay: +this.selectedDuration });
    this.hotelDetailsForm.patchValue({ description: this.description });
    console.log(this.hotelDetailsForm.value);
    this._hotelPackagesService.update(this.router.snapshot.params.id, this.hotelDetailsForm.value)
      .subscribe(response => {
        console.log(response);
        this.toastr.info('Redirecting..', 'Details Updated');
        this.loadDetails();
        this.isEditable = false;
        // this.route.navigate(['/hotel-packages/'+this.router.snapshot.params.id]); 
      });
  }

  onChangeDuration() {
    console.log(this.selectedDuration);
  }

  onChangePackageValidity() {
    console.log(this.selectedPackageValidity);
  }

}
