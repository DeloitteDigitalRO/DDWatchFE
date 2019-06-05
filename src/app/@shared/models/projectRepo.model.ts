import { QualityReport } from './qualityReport.model';
import { Injectable } from '@angular/core';

export interface ProjectRepoInterface {
    "id": string,
    "name": string,
    "url": string,
    "sonarQubeUrl": string,
    "sonarComponentKey": string,
    "isDefault": boolean,
    "qualityReports": QualityReport[],
}

@Injectable()
export class ProjectRepo implements ProjectRepoInterface {
    "id": string;
    "name": string;
    "url": string;
    "sonarQubeUrl": string;
    "sonarComponentKey": string;
    "isDefault": boolean;
    "qualityReports": QualityReport[];
}
