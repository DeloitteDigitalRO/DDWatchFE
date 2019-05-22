import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectComponent } from '../project/project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ProjectReportsComponent } from '../project-reports/project-reports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
        ProjectReportsComponent
    ],
})
export class DashboardModule { }
