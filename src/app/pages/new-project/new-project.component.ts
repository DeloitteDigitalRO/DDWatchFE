import { Component, OnInit } from '@angular/core';
import { Project } from '../../@shared/models/project.model';

@Component({
    selector: 'ngx-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
    private project: Project;
    private tags: String;
    private newRepository = {
        name: null,
        url: null,
        sonarQubeUrl: null,
        sonarComponentKey: null,
    };

    ngOnInit() {
        this.project = new Project(
            [
                {
                    "name": 'Repository 1',
                    'url': 'adadadasdadad',
                    "sonarQubeUrl": "xxxx",
                    "sonarComponentKey": "some-key",
                },
                {
                    "name": 'Repository 2',
                    'url': 'adadadasdadad',
                    "sonarQubeUrl": "yyyy",
                    "sonarComponentKey": "some-key",
                },
            ]
        );
    }

    private removeRepository(repository) {
        console.log('Removing repository', repository);
        this.project.repositories.forEach( (item, idx) => {
            if(item === repository) {
                this.project.repositories.splice(idx, 1);
            }
        });
    }

    private addRepository() {
        console.log('Adding repository', this.newRepository);
        this.project.repositories.push(this.newRepository);
        this.newRepository = {
            name: null,
            url: null,
            sonarQubeUrl: null,
            sonarComponentKey: null,
        };
    }

    private saveProject() {
        this.project.tags = this.tags.split(' ');
        console.log('Saving project', this.project);
    }

    private getAddRepositoryButtonStyle() {
        if(this.isRepositoryComplete()) {
            return ['btn-primary'];
        } else {
            return ['btn-disabled']
        }
    }

    private isRepositoryComplete() {
        return this.newRepository.name
            && this.newRepository.url
            && this.newRepository.sonarQubeUrl
            && this.newRepository.sonarComponentKey;
    }
}
