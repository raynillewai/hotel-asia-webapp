import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sub: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => console.log(this.route.params)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoListing() {
    this.router.navigateByUrl('hotel-packages', { replaceUrl: true });
  }

}
