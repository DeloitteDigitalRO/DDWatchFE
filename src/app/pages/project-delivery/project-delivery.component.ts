import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../@shared/models/project.model';

@Component({
  selector: 'project-delivery',
  templateUrl: './project-delivery.component.html',
  styleUrls: ['./project-delivery.component.scss']
})
export class ProjectDeliveryComponent implements OnInit {
  private project: Project;
  private latestMetricsReport;

  constructor(private router: Router) {
    this.project = this.router.getCurrentNavigation().extras as Project;
    this.latestMetricsReport =  this.project.deliveryReports[0];
    console.log('Project delivery for project', this.project);
  }

  ngOnInit() {
  }

}
