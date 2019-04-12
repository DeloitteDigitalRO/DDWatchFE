import { QualityReport } from './qualityReport.model';
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
    "qualityReports": QualityReport[],
    "lastQualityReport": string,
    "deliveryReports": any[],
    "lastDeliveryReport": string,
    "tags": string[],
    "sonarQubeUrl": string,
    "sonarComponentKey": string
}

@Injectable()
export class Project implements ProjectInterface {
    "id": string;
    "name": string;
    "description": string;
    "deliveryLead": string;
    "deliveryLeadEmail": string;
    "technicalLead": string;
    "technicalLeadEmail": string;
    "deliveryStatus": string;
    "qualityStatus": string;
    "qualityReports": QualityReport[];
    "lastQualityReport": string;
    "deliveryReports": any[];
    "lastDeliveryReport": string;
    "tags": string[];
    "sonarQubeUrl": string;
    "sonarComponentKey": string;

}
