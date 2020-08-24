import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HotelPackages } from '../_models/hotel-packages.model';

@Injectable()
export class HotelPackagesService implements Resolve<any> {
  routeParams: any;
//   onResultChanged: BehaviorSubject<PageableResponse<FitmentRequest>> = new BehaviorSubject(new PageableResponse());

  _apiUrl: string = 'http://localhost:3000';
  appendedData: any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {ActivatedRoute} route
   */
  constructor(private _httpClient: HttpClient, private route: ActivatedRoute) {
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
//     return new Promise((resolve, reject) => {
//       this.routeParams = route.params;
//       resolve();
//     });
//   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('resolving');
    return this.getAllHotelPackages();
  }

  /**
   * Get
   *
   * @returns {Promise<any>}
   */

  getAllHotelPackages(): Observable<HotelPackages[]> {
    return this._httpClient.get<HotelPackages[]>(`${this._apiUrl}/hotels`);
  }

  getHotelPackage(id: string): Observable<HotelPackages> {
    return this._httpClient.get<HotelPackages>(`${this._apiUrl}/hotels/${id}`);
  }
//   update(id: string, h: HotelPackages): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this._httpClient.put<HotelPackages>(`${this._apiUrl}/hotels/${id}/update`, h)
//       .subscribe((response: any) => {
//         resolve(response);
//       }, reject);
//     });
//   }

  create(h: any) {
    console.log(h);
    return this._httpClient.post<HotelPackages>(`${this._apiUrl}/hotels/create`, h);
  }

  update(id: string, h: any) {
    console.log(h);
    return this._httpClient.put<any>(`${this._apiUrl}/hotels/${id}/update`, h);
  }

  delete(id: string) {
    return this._httpClient.delete(`${this._apiUrl}/hotels/${id}/delete`);
  }

  get appendData() {
    return this.appendedData;
  }

  set appendData(obj) {
    this.appendedData = obj;
  }


//   getAllHotelPackages(): Observable<any> {
//     return this._httpClient
//     .get<HotelPackages>(this._apiUrl+'hotels', {
//     //   params: new HttpParams()
//     //   .set('search', search)
//     //   .set('page', page.toString())
//     //   .set('advance', `${isAdvance}`)
//     //   .set('size', size.toString())
//     //   .set('sort', sort + ',' + dir)
//     //   .set('fitmentChannel', 'CRMLITE'),
//     })
//     .pipe(tap(response => {
//       this.onResultChanged.next(new PageableResponse(response, FitmentRequest));
//     }));
//   }
}
