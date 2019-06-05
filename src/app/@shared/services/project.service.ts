import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from  'rxjs/operators';

@Injectable()
export class ProjectService {
    baseUrl: string;
    projects;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.apiEndpooint}/projects`;
    }

    async createProject(project, successCb, errorCb) {
        const url = `${this.baseUrl}`;
        return await this.http.post<any>(url, project, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(map(this.trackProgress))
        .subscribe(successCb, errorCb);
    }

    async getProjects() {
        let asyncResult = await this.http.get(this.baseUrl, this.httpOptions()).toPromise();
        this.projects = asyncResult;
        return asyncResult
    }

    async uploadDeliveryReport(projectId, data, successCb, errorCb) {
        const url = `${this.baseUrl}/${projectId}/deliveryReports/upload`;
        return await this.http.post<any>(url, data, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(map(this.trackProgress))
        .subscribe(successCb, errorCb);
    }

    private httpOptions() {
        return {
            headers: new HttpHeaders({ 'Content-Type':  'application/json'})
        } 
    }

    private trackProgress(event) {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                const progress = Math.round(100 * event.loaded / event.total);
                return { status: 'progress', message: progress };
            case HttpEventType.Response:
                return {
                  deliveryReport: event.body
                };
            default:
                return `Unhandled event: ${event.type}`;
        }
    }
}
