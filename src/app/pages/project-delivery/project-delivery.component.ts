import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../@shared/models/project.model';
import * as moment from 'moment';

@Component({
  selector: 'project-delivery',
  templateUrl: './project-delivery.component.html',
  styleUrls: ['./project-delivery.component.scss']
})
export class ProjectDeliveryComponent implements OnInit {
  private project: Project;
  private latestMetricsReport;
  metrics: Object;
  objectKeys = Object.keys;

  //chart  options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;
  disabledMetrics = ['attritionStatus', 'branchCoverageStatus', 'changeOrderStatus', 'updateDate', 'changeOrderValue', 'createdOn', 'deliveryReportId', 'deliveryStatus', 'duplicationDensityStatus', 'empireTimeStatus', 'escalationRootCauseValue', 'escalationSeniorityValue', 'escalationStatus', 'id', 'invoicingStatus', 'invoicingValue', 'riskOverallStatus', 'riskOverallValue', 'testCoverageStatus']


  constructor(private router: Router) {
    this.project = this.router.getCurrentNavigation().extras as Project;
    this.latestMetricsReport = this.project.deliveryReports[0];
    this.initChartData();
    console.log('Project delivery for project', this.project);
  }


  ngOnInit() {
  }

  initChartData() {
    //loop through all the metrics and assign them as data arrays
    //this.metrics = {Object.assign({}, activeProject.qualityReports[0].sonarQubeReport)};
    this.metrics = {};
    for (var key in this.project.deliveryReports[0].metricsReport) {
      if (this.disabledMetrics.indexOf(key) === -1) {
        this.metrics[key] = [{ name: key, series: [] }]
      }
    }

    this.project.deliveryReports.reverse().forEach(deliveryReport => {
      const date = moment(deliveryReport.updateDate).format('DD MM')
      for (var _key in deliveryReport.metricsReport) {
        if (this.disabledMetrics.indexOf(_key) === -1 && deliveryReport.metricsReport[_key] != null) {
          this.metrics[_key][0].series.push({ name: date, value: deliveryReport.metricsReport[_key] });
        }
      }
    });

    console.log(this.metrics)
  }


}
