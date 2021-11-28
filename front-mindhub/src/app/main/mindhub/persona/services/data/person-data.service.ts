import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService, ValidParamsObject, prepareHttpParams } from '@core/services/api.service';
import { Person } from '../../models';

@Injectable({ providedIn: 'root' })
export class PersonDataService {

    public static readonly path: string = 'people';

    private static makePath(uuid: string): string {
        return uuid.includes(PersonDataService.path) ? uuid : `${PersonDataService.path}/${uuid}`;
    }

    constructor(private api: ApiService) { }

    get(uuid: string): Observable<Person> {
        return this.api.get(PersonDataService.makePath(uuid)).pipe(
            map(data => new Person(data)),
        );
    }

    getAll(parameters: ValidParamsObject = {}): Observable<any> {
        const httpParams = prepareHttpParams(parameters);

        return this.api.get(PersonDataService.path, httpParams).pipe(
            map(data => PersonDataService.deserializeHydraMember(data)),
        );
    }

    save(person: Partial<Person>): Observable<Person> {
        if (person.id) {
            return this.api.put(PersonDataService.makePath(person.id), person)
                .pipe(map(data => new Person(data)));
        } else {
            return this.api.post(PersonDataService.path, Person)
                .pipe(map(data => new Person(data)));
        }
    }

    delete(person: Person): Observable<any> {
        if (person['@id']) {
            return this.api.delete(PersonDataService.makePath(person.id), person);
        }
    }

    public static deserializeHydraMember(data: any): Person[] {
        data['hydra:member'] = data['hydra:member'].map(person => new Person(person));
        return data;
    }
}
