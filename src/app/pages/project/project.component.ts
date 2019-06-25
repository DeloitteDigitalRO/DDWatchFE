import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../../@shared/services/project.service';
import { Project } from '../../@shared/models/project.model';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
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
    activeProjectRepo: any;
    activeProjectId: string;

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
            this.activeProjectId = params.get('id');

            // get current report based on param ID
            if (params.has('id') && this.projectService.projects) {
                this.projectList = this.projectService.projects;
                this.activeProject = this.projectList.length > 0 && this.projectService.projects.find((el) => el.id === this.activeProjectId)
                this.activeProjectRepo = this.activeProject.projectRepos.find(repo => repo.isDefault) || this.activeProject.projectRepos[0];
                this.initChartData();
            }
            // if page is accessed directly then fetch the data then filter the current report
            else {
                this.projectService.getProjects().then((result) => {
                    this.projectList = result as Array<Project>;
                    this.activeProject = this.projectList.length > 0 && this.projectService.projects.find((el) => el.id === this.activeProjectId)
                    this.activeProjectRepo = this.activeProject.projectRepos.find(repo => repo.isDefault) || this.activeProject.projectRepos[0];
                    this.initChartData();
                })
            }
        });
    }

    initChartData() {
        //loop through all the metrics and assign them as data arrays
        //this.metrics = {Object.assign({}, activeProject.qualityReports[0].sonarQubeReport)};
        this.metrics = {};
        for (var key in this.activeProjectRepo.qualityReports[0].sonarQubeReport) {
            if(this.disabledMetrics.indexOf(key) === -1){
                this.metrics[key] = [{name: key, series:[]}]
            }
        }           
        
        for(var _i = this.activeProjectRepo.qualityReports.length - 1; _i >= 0; _i--){
                var sonarReport = this.activeProjectRepo.qualityReports[_i];
                const date = moment(sonarReport.updateDate).format('DD MM')
                for (var _key in sonarReport.sonarQubeReport) {
                    if(this.disabledMetrics.indexOf(_key) === -1){
                        this.metrics[_key][0].series.push({name: date, value: sonarReport.sonarQubeReport[_key]});
                    }
                }
        }
    
        console.log(this.metrics)
    }

    onChange(newValue) {
        console.log(newValue);
       
        this.activeProjectRepo =  newValue;
        this.initChartData();
    }

    refreshMetrics(){
        this.projectService.updateProjetRepo(this.activeProjectRepo.id).then((result) => {
            this.activeProjectRepo.qualityReports = ([result].concat(this.activeProjectRepo.qualityReports))
            this.initChartData();
        })
    }

    getAverageOverallCoverage(){
        var repos = this.activeProject.projectRepos;
        var total = 0;
        var counter = 0;

        repos.forEach(repo => {
            total += repo.qualityReports[0].sonarQubeReport.overallCoverage;
            counter++;
        });

        return (total/counter).toFixed(1);
    }

    getAverageCodeDuplication(){
        var repos = this.activeProject.projectRepos;
        var total = 0;
        var counter = 0;

        repos.forEach(repo => {
            total += repo.qualityReports[0].sonarQubeReport.duplicatedLines;
            counter++;
        });

        return (total/counter).toFixed(1);
    }

    getAverageCodeBugs(){
        var repos = this.activeProject.projectRepos;
        var total = 0;
        var counter = 0;

        repos.forEach(repo => {
            total += repo.qualityReports[0].sonarQubeReport.totalBugs;
            counter++;
        });

        return (total/counter).toFixed(1);
    }
}
