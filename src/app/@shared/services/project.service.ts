import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProjectService {

    projects;
    constructor(private http: HttpClient) { }

    async getProjects() {

        const url = "http://localhost:9090/projects"
        let asyncResult = await this.http.get(url, this.httpOptions()).toPromise();
        console.log('ProjectService getProjects | ', asyncResult);
        this.projects = asyncResult;
        return asyncResult
    }

    private httpOptions() {

        return {
          headers: new HttpHeaders({ 'Content-Type':  'application/json'})
        }
      }
}
