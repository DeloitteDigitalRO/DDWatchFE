import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../../@shared/services/project.service';
import { Project } from '../../@shared/models/project.model';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

    activeProject: Project;
    projectList: Project[];
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
    disabledMetrics = ['key', 'name', 'duplicatedLinesDensity', 'updateDate' ]
    constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService){}

    ngOnInit() {

        this.route.paramMap.subscribe((params: ParamMap) => {
            const activeReportId = params.get('id');

            // get current report based on param ID
            if (params.has('id') && this.projectService.projects) {
                this.projectList = this.projectService.projects;
                this.activeProject = this.projectList.length > 0 && this.projectService.projects.find((el) => el.id === activeReportId)
                this.initChartData(this.activeProject);
            }
            // if page is accessed directly then fetch the data then filter the current report
            else {
                this.projectService.getProjects().then((result) => {
                    this.projectList = result as Array<Project>;
                    this.activeProject = this.projectList.length > 0 && this.projectService.projects.find((el) => el.id === activeReportId)
                    this.initChartData(this.activeProject);
                  })
            }

        });
    }

    initChartData(activeProject) {
        let defaultRepo = activeProject.projectRepos.find(repo => repo.isDefault) || activeProject.projectRepos[0];

        //loop through all the metrics and assign them as data arrays
        //this.metrics = {Object.assign({}, activeProject.qualityReports[0].sonarQubeReport)};
        this.metrics = {};
        for (var key in defaultRepo.qualityReports[0].sonarQubeReport) {
            if(this.disabledMetrics.indexOf(key) === -1){
                this.metrics[key] = [{name: key, series:[]}]
            }
        }
        defaultRepo.qualityReports.forEach((sonarReport) => {
            const date = moment(sonarReport.updateDate).format('DD MM')
            for (var _key in sonarReport.sonarQubeReport) {
                if(this.disabledMetrics.indexOf(_key) === -1){
                    this.metrics[_key][0].series.push({name: date, value: sonarReport.sonarQubeReport[_key]});
                }
            }
        })
        console.log(this.metrics)
    }
}
