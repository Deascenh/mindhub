import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { Event } from '../../models';

@Injectable({ providedIn: 'root' })
export class EventDataService {

    public static readonly path: string = 'events';

    private static makePath(uuid: string): string {
        return uuid.includes(EventDataService.path) ? uuid : `${EventDataService.path}/${uuid}`;
    }

    constructor(private api: ApiService) { }

    get(uuid: string): Observable<Event> {
        return this.api.get(EventDataService.makePath(uuid)).pipe(
            map(data => new Event(data)),
        );
    }

    getAll(parameters: ValidParamsObject = {}): Observable<any> {
        const httpParams = prepareHttpParams(parameters);

        return this.api.get(EventDataService.path, httpParams).pipe(
            map(data => EventDataService.deserializeHydraMember(data)),
        );
    }

    save(event: Partial<Event>): Observable<Event> {
        if (event.id) {
            return this.api.put(EventDataService.makePath(event.id), event)
                .pipe(map(data => new Event(data)));
        } else {
            return this.api.post(EventDataService.path, event)
                .pipe(map(data => new Event(data)));
        }
    }

    delete(event: Event): Observable<any> {
        if (event['@id']) {
            return this.api.delete(EventDataService.makePath(event.id), event);
        }
    }

    public static deserializeHydraMember(data: any): Event[] {
        data['hydra:member'] = data['hydra:member'].map(event => new Event(event));
        return data;
    }
}
