import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { Stuff } from '../../models';

@Injectable({ providedIn: 'root' })
export class StuffService {

    public static readonly path: string = 'stuffs';

    private static makePath(uuid: string): string {
        return uuid.includes(StuffService.path) ? uuid : `${StuffService.path}/${uuid}`;
    }

    constructor(private api: ApiService) { }

    get(uuid: string): Observable<Stuff> {
        return this.api.get(StuffService.makePath(uuid)).pipe(
            map(data => new Stuff(data)),
        );
    }

    getAll(parameters: ValidParamsObject = {}): Observable<any> {
        const httpParams = prepareHttpParams(parameters);

        return this.api.get(StuffService.path, httpParams).pipe(
            map(data => StuffService.deserializeHydraMember(data)),
        );
    }

    save(Stuff: Partial<Stuff>): Observable<Stuff> {
        if (Stuff.id) {
            return this.api.put(StuffService.makePath(Stuff.id), Stuff)
                .pipe(map(data => new Stuff(data)));
        } else {
            return this.api.post(StuffService.path, Stuff)
                .pipe(map(data => new Stuff(data)));
        }
    }

    delete(Stuff: Stuff): Observable<any> {
        if (Stuff['@id']) {
            return this.api.delete(StuffService.makePath(Stuff.id), Stuff);
        }
    }

    public static deserializeHydraMember(data: any): Stuff[] {
        data['hydra:member'] = data['hydra:member'].map(Stuff => new Stuff(Stuff));
        return data;
    }
}
