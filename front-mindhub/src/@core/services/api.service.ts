import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  body?: any;
  responseType?: any;
  reportProgress?: boolean;
  withCredentials?: boolean;
  observe?: any;
}

export interface ValidParamsObject {
  [param: string]: string | boolean | number | string[];
}


/**
 * Allows to transform an object into HttpParams
 * ready to be passed to an http request.
 *
 * @param { ValidParamsObject } object
 *
 * @return { HttpParams }
 */
export function prepareHttpParams(object: ValidParamsObject): HttpParams {
  let httpParams = new HttpParams();
  Object.keys(object).forEach(function (key) {
    if (Array.isArray(object[key])) {
      (object[key] as []).forEach(value => httpParams = httpParams.append(key, value));
    } else {
      httpParams = httpParams.append(key, object[key] as string);
    }
  });

  return httpParams;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions: HttpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json, application/ld+json',
    }),
  };

  constructor(private http: HttpClient) { }

  private static makePath(path: string): string {
    return environment.mindhub_api_url + '/' + path;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = Object.assign({}, this.httpOptions);
    httpOptions.params = params;

    return this.http.get(
      ApiService.makePath(path),
      httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      ApiService.makePath(path),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      ApiService.makePath(path),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  download(path: string, params: HttpParams = new HttpParams()): Observable<File> {
    const httpOptions: HttpOptions = {
      params: params,
      responseType: 'arraybuffer',
      observe: 'response'
    };

    return this.http.get(
      ApiService.makePath(path),
      httpOptions,
    ).pipe(
      catchError(this.handleErrors.bind(this)),
      map((response) => {
        const fileName = response.headers.get('content-disposition').match(/.*filename=['"]?([^"]+)/)[1];

        return new File(
          [response.body],
          fileName,
          {
            type: response.type,
            lastModified: (new Date()).getTime()
          }
        );
      })
    );
  }

  upload(path: string, formData: FormData, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions: HttpOptions = {
      params: params,
      reportProgress: true,
    };

    return this.http.post(
      ApiService.makePath(path),
      formData,
      httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  /**
   * Safe delete with body
   * @param { string } path
   * @param { Object } body
   */
  delete(path: string, body: object = {}): Observable<any> {
    return this.http.request(
      'delete',
      ApiService.makePath(path),
      { body },
    ).pipe(catchError(this.handleErrors.bind(this)));
  }



  /**
   * This function Handles an error received from the server and caught,
   * it describes it in the DOM then throws a native error in a dev context
   *
   * @param { any } error
   */
  private handleErrors(error: any) {
    console.error('Response in Error : ', error);

    return throwError(error);
  }
}
