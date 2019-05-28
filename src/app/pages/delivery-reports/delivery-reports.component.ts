import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from  'rxjs/operators';

@Component({
    selector: 'ngx-project',
    templateUrl: './delivery-reports.component.html',
    styleUrls: ['./delivery-reports.component.scss']
})
export class DeliveryReportsComponent {

    projectId: String;
    form: FormGroup;
    deliveryReport: Object = null;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            excelReportFile: [''],
            projectId: '',
        });
        this.projectId = this.route.snapshot.paramMap.get('projectId');
        console.log('ngOnInit, projectId', this.projectId);
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('excelReportFile').setValue(file);
        }
    }

    onSubmit() {
        const formData = new FormData();
        console.log('Excel', this.form.get('excelReportFile').value)
        formData.append('deliveryReportFile', this.form.get('excelReportFile').value);
        this.upload(this.projectId, formData).subscribe(
          (res) => {
            this.deliveryReport = res;
            console.log('Delivery report', this.deliveryReport);
          },
          (err) => console.log(err)
        );
    }

    public upload(projectId, data) {
        let uploadURL = `http://localhost:9090/projects/${projectId}/deliveryReports/upload`;

        return this.httpClient.post<any>(uploadURL, data, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };
                case HttpEventType.Response:
                    return event.body;
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }

    public getStatusStyle(status) {
        switch (status) {
            case 'A':
                return ['ion-alert-circled', 'status-text-warn'];
            case 'G':
                return ['ion-checkmark-circled', 'status-text-ok'];
            case 'R':
                return ['ion-close-circled', 'status-text-alert'];
        }
    }
}
