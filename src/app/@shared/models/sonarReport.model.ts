import { Injectable } from '@angular/core';

export interface SonarReport {
    "name": string;
    "key": any;
    "totalBugs": number;
    "blockerBugs": number;
    "criticalBugs": number;
    "majorBugs": number;
    "minorBugs": number;
    "otherBugs": number;
    "linesOfCode": number;
    "defectDensity": string;
    "totalIssues": number;
    "totalVulnerabilities": number;
    "blockerVulnerabilities": number;
    "criticalVulnerabilities": number;
    "majorVulnerabilities": number;
    "minorVulnerabilities": number;
    "otherVulnerabilities": number;
    "totalCodeSmells": number;
    "blockerCodeSmells": number;
    "criticalCodeSmells": number;
    "majorCodeSmells": number;
    "minorCodeSmells": number;
    "otherCodeSmells": number;
    "duplicatedLines": number;
    "duplicatedLinesDensity": number;
    "duplicatedBlocks": number;
    "cyclomaticComplexity": number;
    "cognitiveComplexity": number;
    "overallCoverage": number;
    "lineCoverage": number;
    "conditionsCoverage": any

}

@Injectable()
export class SonarReport implements SonarReport{
    "name": string;
    "key": any;
    "totalBugs": number;
    "blockerBugs": number;
    "criticalBugs": number;
    "majorBugs": number;
    "minorBugs": number;
    "otherBugs": number;
    "linesOfCode": number;
    "defectDensity": string;
    "totalIssues": number;
    "totalVulnerabilities": number;
    "blockerVulnerabilities": number;
    "criticalVulnerabilities": number;
    "majorVulnerabilities": number;
    "minorVulnerabilities": number;
    "otherVulnerabilities": number;
    "totalCodeSmells": number;
    "blockerCodeSmells": number;
    "criticalCodeSmells": number;
    "majorCodeSmells": number;
    "minorCodeSmells": number;
    "otherCodeSmells": number;
    "duplicatedLines": number;
    "duplicatedLinesDensity": number;
    "duplicatedBlocks": number;
    "cyclomaticComplexity": number;
    "cognitiveComplexity": number;
    "overallCoverage": number;
    "lineCoverage": number;
    "conditionsCoverage": any

}
