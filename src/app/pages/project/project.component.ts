import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../../@shared/services/project.service';
import { Project } from '../../@shared/models/project.model';
import { Router } from '@angular/router';
import { SonarReport } from '../../@shared/models/sonarReport.model';
@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

    activeProject: Project;
    metrics: Object
    objectKeys = Object.keys;
    //sonarReports;

    constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService){}

    ngOnInit() {

        this.route.paramMap.subscribe((params: ParamMap) => {
            if ( params.has('id') && this.projectService.projects ) {
                const activeReportId = params.get('id');
                this.activeProject = this.projectService.projects.length > 0 && this.projectService.projects.find((el) => el.id === activeReportId)
            }
            else{
                this.router.navigateByUrl('/pages/dashboard/');
            }
           // console.log(this.activeProject)
            
           // this.sonarReports = new SonarReport
            this.metrics = Object.assign({}, this.activeProject.qualityReports[0].sonarQubeReport);
            for (var key in this.metrics) {
                this.metrics[key] = []
            }
            this.metrics['updateDate'] = []
            this.activeProject.qualityReports.forEach((sonarReport) => {
                console.log(sonarReport.sonarQubeReport)
                for (var key in sonarReport.sonarQubeReport) {
                    this.metrics[key].push(sonarReport.sonarQubeReport[key])
                }
                this.metrics['updateDate'].push(sonarReport.updateDate);
            })
            console.log(this.metrics)
        });
    }

}
