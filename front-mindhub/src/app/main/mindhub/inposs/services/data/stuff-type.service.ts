import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { StuffType } from '../../models';

@Injectable({ providedIn: 'root' })
export class StuffTypeService {

    public static readonly path: string = 'stuff_types';

    private static makePath(uuid: string): string {
        return uuid.includes(StuffTypeService.path) ? uuid : `${StuffTypeService.path}/${uuid}`;
    }

    constructor(private api: ApiService) { }

    get(uuid: string): Observable<StuffType> {
        return this.api.get(StuffTypeService.makePath(uuid)).pipe(
            map(data => new StuffType(data)),
        );
    }

    getAll(parameters: ValidParamsObject = {}): Observable<any> {
        const httpParams = prepareHttpParams(parameters);

        return this.api.get(StuffTypeService.path, httpParams).pipe(
            map(data => StuffTypeService.deserializeHydraMember(data)),
        );
    }

    save(stuffType: Partial<StuffType>): Observable<StuffType> {
        if (stuffType.id) {
            return this.api.put(StuffTypeService.makePath(stuffType.id), stuffType)
                .pipe(map(data => new StuffType(data)));
        } else {
            return this.api.post(StuffTypeService.path, stuffType)
                .pipe(map(data => new StuffType(data)));
        }
    }

    delete(stuffType: StuffType): Observable<any> {
        if (stuffType['@id']) {
            return this.api.delete(StuffTypeService.makePath(stuffType.id), stuffType);
        }
    }

    public static deserializeHydraMember(data: any): StuffType[] {
        data['hydra:member'] = data['hydra:member'].map(stuffType => new StuffType(stuffType));
        return data;
    }
}
