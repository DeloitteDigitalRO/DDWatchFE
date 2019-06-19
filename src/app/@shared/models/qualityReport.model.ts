import { SonarReport } from './sonarReport.model';
import { QA } from './qa.model';

export interface QualityReport {
    'sonarQubeReport': SonarReport;
    'updateDate': string;
    'questionsAnswers': QA[];
}
