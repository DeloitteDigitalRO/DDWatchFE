import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { DeliveryReportsComponent } from './delivery-reports/delivery-reports.component';
import { ProjectDeliveryComponent } from './project-delivery/project-delivery.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'project/:id',
      component: ProjectComponent,
    },
    {
      path: 'edit-project/:id',
      component: EditProjectComponent,
    },
    {
      path: 'new-project',
      component: NewProjectComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'project-reports/:projectId',
      component: DeliveryReportsComponent,
    },
    {
      path: 'project-delivery/:id',
      component: ProjectDeliveryComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
