import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { StuffIllustration } from '../../models';

@Injectable({ providedIn: 'root' })
export class StuffIllustrationService {

    public static readonly path: string = 'stuff_illustrations';

    private static makePath(uuid: string): string {
        return uuid.includes(StuffIllustrationService.path) ? uuid : `${StuffIllustrationService.path}/${uuid}`;
    }

    constructor(private api: ApiService) { }

    get(uuid: string): Observable<StuffIllustration> {
        return this.api.get(StuffIllustrationService.makePath(uuid)).pipe(
            map(data => new StuffIllustration(data)),
        );
    }

    getAll(parameters: ValidParamsObject = {}): Observable<any> {
        const httpParams = prepareHttpParams(parameters);

        return this.api.get(StuffIllustrationService.path, httpParams).pipe(
            map(data => StuffIllustrationService.deserializeHydraMember(data)),
        );
    }

    save(stuffIllustration: Partial<StuffIllustration>, file: Blob): Observable<StuffIllustration> {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('stuff', stuffIllustration.stuff as string);
        formData.append('main', stuffIllustration.main.toString());

        return this.api.upload(StuffIllustrationService.path, formData).pipe(
          map(data => new StuffIllustration(data))
        );
    }

    delete(stuffIllustration: StuffIllustration): Observable<any> {
        if (stuffIllustration['@id']) {
            return this.api.delete(StuffIllustrationService.makePath(stuffIllustration.id), stuffIllustration);
        }
    }

    public static deserializeHydraMember(data: any): StuffIllustration[] {
        data['hydra:member'] = data['hydra:member'].map(stuffIllustration => new StuffIllustration(stuffIllustration));
        return data;
    }
}
