import { ProjectRepo } from './projectRepo.model';
import { Injectable } from '@angular/core';

export interface ProjectInterface {
    'id': string;
    'name': string;
    'description': string;
    'deliveryLead': string;
    'deliveryLeadEmail': string;
    'technicalLead': string;
    'technicalLeadEmail': string;
    'deliveryStatus': string;
    'qualityStatus': string;
    'lastQualityReport': string;
    'tags': string[];
    'projectRepos': ProjectRepo[];
    'latestQualityReportData': any;
    'overallCoverageChartData': any;
    'deliveryReports': any[];
    'latestDeliveryReport': any;
    'deliveryBarChartData': any;
}

@Injectable()
export class Project implements ProjectInterface {

    public constructor() {
        this.projectRepos = [];
    }

    'id': string;
    'name': string;
    'description': string;
    'deliveryLead': string;
    'deliveryLeadEmail': string;
    'technicalLead': string;
    'technicalLeadEmail': string;
    'deliveryStatus': string;
    'qualityStatus': string;
    'lastQualityReport': string;
    'tags': string[];
    'projectRepos': ProjectRepo[];
    'latestQualityReportData': any;
    'overallCoverageChartData': any;
    'deliveryReports': any[];
    'latestDeliveryReport': any;
    'deliveryBarChartData': any;
}
