import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { StuffService } from './data/stuff.service';

@Injectable({
  providedIn: 'root'
})
export class InpossService implements Resolve<any> {
  // Public
  public stuffList: Array<any>;
  public selectedStuff;

  public onStuffListChange: BehaviorSubject<any>;
  public onSelectedStuffChange: BehaviorSubject<any>;

  // Private
  private idHandel;

  private sortRef = key => (a, b) => {
    const fieldA = a[key];
    const fieldB = b[key];

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return comparison;
  };

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param stuffService
   */
  constructor(
    private _httpClient: HttpClient,
    private stuffService: StuffService
  ) {
    this.onStuffListChange = new BehaviorSubject({});
    this.onSelectedStuffChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.idHandel = route.params.id;

    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getStuffs(), this.getSelectedStuff()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Stuffs
   */
  getStuffs(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.stuffService.getAll().subscribe((response: any) => {
        this.stuffList = response;
        this.sortStuff('featured'); // Default shorting
        resolve(this.stuffList);
      }, reject);
    });
  }

  /**
   * Get Selected Stuff
   */
  getSelectedStuff(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.stuffService.get(this.idHandel).subscribe((response: any) => {
        this.selectedStuff = response;
        this.onSelectedStuffChange.next(this.selectedStuff);
        resolve(this.selectedStuff);
      }, reject);
    });
  }

  /**
   * Sort Product
   *
   * @param sortBy
   */
  sortStuff(sortBy) {
    let sortDesc = false;

    const sortByKey = (() => {
      if (sortBy === 'price-desc') {
        sortDesc = true;
        return 'price';
      }
      if (sortBy === 'price-asc') {
        return 'price';
      }
      sortDesc = true;
      return 'id';
    })();

    const sortedData = this.stuffList.sort(this.sortRef(sortByKey));
    if (sortDesc) sortedData.reverse();
    this.stuffList = sortedData;
    this.onStuffListChange.next(this.stuffList);
  }
}
