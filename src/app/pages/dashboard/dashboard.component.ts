import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../@shared/services/project.service';
import { Project } from '../../@shared/models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{

    constructor(private projectService: ProjectService, private router: Router){}

    projects:Array<Project> = [];

    //chart data mock
    view: any[] = [120, 120];
    single = [
        {
        "name": "Germany",
        "value": 60
        },
        {
        "name": "USA",
        "value": 40
        }
    ];

    colorScheme = {
        domain: ['#d2d2d2', '#ffffff']
    };

    ngOnInit() {

        this.projectService.getProjects().then((result) => {
            this.projects = result as Array<Project>;
        })
    }

    getDeliveryDetails(reportId) {
        this.router.navigateByUrl('/pages/project/' + reportId);

    }
    createNewProject() {
        alert(21323)
        this.router.navigateByUrl('/pages/new-project');
    }
}
