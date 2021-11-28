import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { EventCategory } from '../../models';

@Injectable({ providedIn: 'root' })
export class EventCategoryDataService {

  public static readonly path: string = 'event_categories';

  private static makePath(uuid: string): string {
    return uuid.includes(EventCategoryDataService.path) ? uuid : `${EventCategoryDataService.path}/${uuid}`;
  }

  constructor(private api: ApiService) { }

  get(uuid: string): Observable<EventCategory> {
    return this.api.get(EventCategoryDataService.makePath(uuid)).pipe(
      map(data => new EventCategory(data)),
    );
  }

  getAll(parameters: ValidParamsObject = {}): Observable<any> {
    const httpParams = prepareHttpParams(parameters);

    return this.api.get(EventCategoryDataService.path, httpParams).pipe(
      map(data => EventCategoryDataService.deserializeHydraMember(data)),
    );
  }

  save(event: Partial<EventCategory>): Observable<EventCategory> {
    if (event.id) {
      return this.api.put(EventCategoryDataService.makePath(event.id), event)
        .pipe(map(data => new EventCategory(data)));
    } else {
      return this.api.post(EventCategoryDataService.path, EventCategory)
        .pipe(map(data => new EventCategory(data)));
    }
  }

  public static deserializeHydraMember(data: any): EventCategory[] {
    data['hydra:member'] = data['hydra:member'].map(eventCategory => new EventCategory(eventCategory));
    return data;
  }
}
