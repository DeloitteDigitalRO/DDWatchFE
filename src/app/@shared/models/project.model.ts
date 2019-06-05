import { QualityReport } from './qualityReport.model';
import { ProjectRepo } from './projectRepo.model';
import { Injectable } from '@angular/core';

export interface ProjectInterface {
    "id": string,
    "name": string,
    "description": string,
    "deliveryLead": string,
    "deliveryLeadEmail": string,
    "technicalLead": string,
    "technicalLeadEmail": string,
    "deliveryStatus": string,
    "qualityStatus": string,
    "lastQualityReport": string,
    "tags": string[],
    // Repositories
    // "sonarQubeUrl": string,
    // "sonarComponentKey": string,
    "projectRepos": ProjectRepo[],
    "latestQualityReportData": any,
    "overallCoverageChartData": any,
    // Metrics
    "deliveryReports": any[];
    "latestDeliveryReport": any;
    "deliveryBarChartData": any
}

@Injectable()
export class Project implements ProjectInterface {

    public constructor(projectRepos: ProjectRepo[]) {
        this.projectRepos = projectRepos;
    }

    "id": string;
    "name": string;
    "description": string;
    "deliveryLead": string;
    "deliveryLeadEmail": string;
    "technicalLead": string;
    "technicalLeadEmail": string;
    "deliveryStatus": string;
    "qualityStatus": string;
    "lastQualityReport": string;
    "tags": string[];
    "projectRepos": ProjectRepo[];
    // "sonarQubeUrl": string;
    // "sonarComponentKey": string;
    "latestQualityReportData": any;
    "overallCoverageChartData": any;
    // Delivery Reports
    "deliveryReports": any[];
    "latestDeliveryReport": any;
    "deliveryBarChartData": any;
}
