import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectComponent } from '../project/project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { DeliveryReportsComponent } from '../delivery-reports/delivery-reports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MetricsCardComponent } from '../../metrics-card/metrics-card.component';

@NgModule({
    imports: [
        ThemeModule,
        NgxChartsModule
    ],
    declarations: [
        DashboardComponent,
        ProjectComponent,
        EditProjectComponent,
        NewProjectComponent,
        DeliveryReportsComponent,
        MetricsCardComponent
    ],
})
export class DashboardModule { }
