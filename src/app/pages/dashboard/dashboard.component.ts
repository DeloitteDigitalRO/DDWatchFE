import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../@shared/services/project.service';
import {Project} from '../../@shared/models/project.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) {
  }

  private projects: Array<Project> = [];

  private qualityView: any[] = [120, 120];

  private qualityColorScheme = {
    domain: ['#8BA2AD', '#f7f7f7'],
  };

  private deliveryColorScheme = {
    domain: ['#C8E9FA', '#8BA2AD', '#C8E9FA', '#8BA2AD'],
  };

  private deliveryView: any[] = [120, 100];

  ngOnInit() {
    this.projectService.getProjects().then((result) => {
      this.projects = result as Array<Project>;
      console.log('Projects', this.projects);

      // set the latest quality report for each project
      this.setLatestQualityReport(this.projects);

      // set latests metrics report & delivery bar chart data
      this.setLatestDeliveryReport(this.projects);
      this.setDeliveryChartData(this.projects);

      console.log('Post setup projects', this.projects);
    });
  }

  getQualityDetails(reportId) {
    this.router.navigateByUrl('/pages/project/' + reportId);
  }

  editProject(projectId) {
    console.log(projectId);
    this.router.navigateByUrl('/pages/edit-project/' + projectId);
  }

  createNewProject() {
    this.router.navigateByUrl('/pages/new-project');
  }

  addReport(project: Project) {
    console.log('Add report to project', project);
    this.router.navigateByUrl(`/pages/project-reports/${project.id}`);
  }

  getDeliveryDetails(project: Project) {
    console.log('Delivery details for project', project.id);
    // @ts-ignore
    this.router.navigateByUrl(`/pages/project-delivery/${project.id}`, project);
  }

  setLatestQualityReport(projects: Array<Project>) {
    projects.forEach((project) => {
      let latestQualityReport = null;
      let defaultRepo = null;

      if (project.projectRepos && project.projectRepos.length > 0) {
        defaultRepo = project.projectRepos.find(repo => repo.isDefault) || project.projectRepos[0];
      }

      if (defaultRepo && defaultRepo.qualityReports && defaultRepo.qualityReports.length > 0) {
        latestQualityReport = defaultRepo.qualityReports.find((qr) => qr.updateDate === project.lastQualityReport);
        if (!latestQualityReport) {
          latestQualityReport = defaultRepo.qualityReports[0];
        }
      }

      project.latestQualityReportData = latestQualityReport;
      project.overallCoverageChartData = this.generatePieChartData(project);
    });
  }

  private isLatestSonarQubeReportAvailable(project: Project) {
    return project.latestQualityReportData && project.latestQualityReportData.sonarQubeReport;
  }

  private getOverallCoverageValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return project.latestQualityReportData.sonarQubeReport.overallCoverage;
    } else {
      return 0;
    }
  }

  private getOverallCoverageDisplayValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return `${this.getOverallCoverageValue(project).toFixed(0)}%`;
    } else {
      return '0%';
    }
  }

  private getTotalBugsValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return project.latestQualityReportData.sonarQubeReport.totalBugs;
    } else {
      return 0;
    }
  }

  private getTotalBugsDisplayValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return `${this.getTotalBugsValue(project)}`;
    } else {
      return 'No info yet';
    }
  }

  private getTotalVulnerabilitiesValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return project.latestQualityReportData.sonarQubeReport.totalVulnerabilities;
    } else {
      return 0;
    }
  }

  private getTotalVulnerabilitiesDisplayValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return `${this.getTotalVulnerabilitiesValue(project)}`;
    } else {
      return 'No info yet';
    }
  }

  private getTotalSmellsValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return project.latestQualityReportData.sonarQubeReport.totalCodeSmells;
    } else {
      return 0;
    }
  }

  private getTotalSmellsDisplayValue(project: Project) {
    if (this.isLatestSonarQubeReportAvailable(project)) {
      return `${this.getTotalSmellsValue(project)}`;
    } else {
      return 'No info yet';
    }
  }

  private generatePieChartData(project: Project) {
    const overallCoverage = this.getOverallCoverageValue(project);
    return [
      {
        'name': '1',
        'value': Math.floor(overallCoverage),
      },
      {
        'name': '2',
        'value': 100 - Math.floor(overallCoverage),
      },
    ];
  }

  private setLatestDeliveryReport(projects: Array<Project>) {
    projects.forEach((project) => {
      project.latestDeliveryReport = project.deliveryReports[0];
    });
  }

  private setDeliveryChartData(projects: Array<Project>) {
    projects.forEach((project) => {
      const deliveryBarCharData = project.deliveryReports.slice(0, 4).map((report, idx) => {
        return {
          'name': idx,
          'value': report.metricsReport.deliveryValue,
        };
      });

      if (deliveryBarCharData.length < 4) {
        let remaining = 4 - deliveryBarCharData.length;
        while (remaining > 0) {
          deliveryBarCharData.push({
            'name': remaining,
            'value': 0,
          });
          remaining--;
        }
      }

      project.deliveryBarChartData = deliveryBarCharData.reverse();
    });
  }

  private getDeliveryValue(project: Project): string {
    let value = 'No info yet';
    const isValueAvailable = project.latestDeliveryReport
      && project.latestDeliveryReport.metricsReport
      && project.latestDeliveryReport.metricsReport.deliveryValue;

    if (isValueAvailable) {
      value = `${project.latestDeliveryReport.metricsReport.deliveryValue.toFixed(2)}%`;
    }

    return value;
  }

  private isLatestMetricsReportAvailable(project: Project) {
    return project.latestDeliveryReport && project.latestDeliveryReport.metricsReport;
  }

  private getDeliveryStatus(project: Project): string {
    if (this.isLatestMetricsReportAvailable(project)) {
      return project.latestDeliveryReport.metricsReport.deliveryStatus;
    } else {
      return '';
    }
  }

  private getInvoicingStatus(project: Project): string {
    if (this.isLatestMetricsReportAvailable(project)) {
      return project.latestDeliveryReport.metricsReport.invoicingStatus;
    } else {
      return '';
    }
  }

  private getChangeOrderStatus(project: Project): string {
    if (this.isLatestMetricsReportAvailable(project)) {
      return project.latestDeliveryReport.metricsReport.changeOrderStatus;
    } else {
      return '';
    }
  }

  getStatusColor(statusValue: string) {
    switch (statusValue) {
      case 'A':
        return ['status', 'status-warn'];
      case 'G':
        return ['status', 'status-ok'];
      case 'R':
        return ['status', 'status-alert'];
      default:
        return ['status', 'status-undefined'];
    }
  }

  getStatusIcon(statusValue: string) {
    switch (statusValue) {
      case 'A':
        return ['ion-alert-circled'];
      case 'G':
        return ['ion-checkmark-circled'];
      case 'R':
        return ['ion-close-circled'];
      default:
        return ['ion-minus-circled'];
    }
  }
}
