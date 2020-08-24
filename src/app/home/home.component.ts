import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotelPackagesList: any;
  randomHotelPackagesList: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.hotelPackagesList = this.route.snapshot.data.resolveData;
    this.pickRandom();
  }

  pickRandom() {
  // Shuffle array
  const shuffled = this.hotelPackagesList.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  this.randomHotelPackagesList = shuffled.slice(0, 3);
  console.log(this.randomHotelPackagesList);
  }

}
