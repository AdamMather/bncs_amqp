import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Panel } from '../../core/panel.model';

@Injectable()
export class PortalService {

    public record: any;

    constructor(
        private http: Http,
        private httpClient: HttpClient
    ) { }


    // service methods go here
    getPanelData(): Observable<any> {

        // set json header information
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // gather request options
        let options = new RequestOptions({ headers: headers });

        // return all records to the component
        return this.http.get('/api/portal/panel', options)
            .map(response => response.json().map(record => new Panel(record)));
    }
}
