import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from  'rxjs/operators';
// import { ProjectService } from '../../@shared/services/project.service';
// import { Project } from '../../@shared/models/project.model';
// import { Router } from '@angular/router';
// import * as moment from 'moment';
@Component({
    selector: 'ngx-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {

    form: FormGroup;
    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {

    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            sonarReportFile: ['']
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('sonarReportFile').setValue(file);

        }
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.form.get('sonarReportFile').value);
        formData.append('body', JSON.stringify({"questionsAnswers": [{"questionId": "Q1", "answer": "yes"}]}));
        console.log(formData);
        this.upload(formData, null).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
    }

    public upload(data, projectId) {

        let uploadURL = 'http://localhost:9090/projects/1/qualityReports/uploadFile';
        console.log("DATA", data)
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
}
