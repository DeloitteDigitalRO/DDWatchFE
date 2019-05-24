import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../@shared/services/project.service';
import { Project } from '../../@shared/models/project.model';
import { Router } from '@angular/router';
import { SonarReport } from '../../@shared/models/sonarReport.model';
import { QualityReport } from '../../@shared/models/qualityReport.model';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{

    constructor(private projectService: ProjectService, private router: Router){}

    projects: Array<Project> = [];

    //chart data mock
    view: any[] = [120, 120];
    colorScheme = {
        domain: ['#d2d2d2', '#f7f7f7']
    };
    qualityColorScheme = {
        domain: ['#C8E9FA', '#8BA2AD', '#C8E9FA', '#8BA2AD']
    };
    qualityView: any[] = [120, 100];
    mockQualityData = [
        {
            "name": "1",
            "value": 20
        },
        {
            "name": "2",
            "value": 24
        },
        {
            "name": "3",
            "value": 30
        },
        {
            "name": "4",
            "value": 19
        }
    ]
    ngOnInit() {

        this.projectService.getProjects().then((result) => {
            this.projects = result as Array<Project>;
            //set the latest quality report for each project
            this.setLatestQualityReport(this.projects);

            //set latests metrics report & delivery bar chart data
            this.setLatestMetricsReport(this.projects);
            this.setDeliveryChartData(this.projects);

            console.log('Post setup projects', this.projects);
        });
    };

    getQualityDetails(reportId) {
        this.router.navigateByUrl('/pages/project/' + reportId);
    }

    editProject(projectId) {
        console.log(projectId)
        this.router.navigateByUrl('/pages/edit-project/' + projectId);
    }

    createNewProject() {
        this.router.navigateByUrl('/pages/new-project');
    }

    setLatestQualityReport(projects: Array<Project>) {
        projects.forEach( (project) => {

            let latestQualityReport =  project.qualityReports.find((qr) => qr.updateDate === project.lastQualityReport);
            project.latestQualityReportData = !latestQualityReport ? latestQualityReport = project.qualityReports[project.qualityReports.length-1] : latestQualityReport;

            let overallCoverageChartData = this.generatePieChartData(project)
            project.overallCoverageChartData = overallCoverageChartData;
        })
    }

    setLatestMetricsReport(projects: Array<Project>) {
        projects.forEach( (project) => {
            project.latestMetricReport = project.metricsReports[0];
        })
    }

    setDeliveryChartData(projects: Array<Project>) {
        projects.forEach( (project) => {
            let deliveryBarCharData = project.metricsReports.slice(0, 4).map((report, idx) => {
                return {
                    "name": idx,
                    "value": report.deliveryValue
                }
            });

            project.deliveryBarChartData = deliveryBarCharData.reverse();
        });
    }

    generatePieChartData(project: Project) {
        const chartData = [
            {
            "name": "1",
            "value": Math.floor(project.latestQualityReportData.sonarQubeReport.overallCoverage)
            },
            {
            "name": "2",
            "value": 100 - Math.floor(project.latestQualityReportData.sonarQubeReport.overallCoverage)
            }
        ]
        return  chartData
    }

    addReport(projectId) {
        console.log(projectId)
        this.router.navigateByUrl('/pages/project-reports/' + projectId);
    }

    getStatusColor(status) {
        switch (status) {
            case 'A':
                return ['status', 'status-warn'];
            case 'G':
                return ['status', 'status-ok'];
            case 'R':
                return ['status', 'status-alert'];
        }
    }

    getStatusIcon(status) {
        switch (status) {
            case 'A':
                return ['ion-alert-circled'];
            case 'G':
                return ['ion-checkmark-circled'];
            case 'R':
                return ['ion-close-circled'];
        }
    }
}
