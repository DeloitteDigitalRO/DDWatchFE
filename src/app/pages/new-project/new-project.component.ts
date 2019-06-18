import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../@shared/models/project.model';
import { ProjectRepo } from '../../@shared/models/projectRepo.model';
import { ProjectService } from '../../@shared/services/project.service';

@Component({
    selector: 'ngx-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
    private project: Project;
    private tags: String;
    private newRepository: ProjectRepo;
    private defaultRepository;

    constructor(private router: Router,
                private projectService: ProjectService) {
    }

    ngOnInit() {
        this.newRepository = new ProjectRepo();
        this.project = new Project();
    }

    private removeRepository(repository) {
        this.project.projectRepos.forEach( (item, idx) => {
            if (item === repository) {
                this.project.projectRepos.splice(idx, 1);
            }
        });
        console.log('Removed repository', repository, ' Total repos', this.project.projectRepos.length);
    }

    private addRepository() {
        this.project.projectRepos.push(this.newRepository);
        this.newRepository = new ProjectRepo();
        console.log('Adding repository', this.newRepository, ' Total repos', this.project.projectRepos.length);
    }

    private saveProject() {
        this.project.tags = this.tags.split(' ');
        this.project.projectRepos.forEach((item, idx) => {
            const repo = item as ProjectRepo;
            repo.isDefault = (repo === this.defaultRepository);
        });
        console.log('Saving project', this.project);
        this.projectService.createProject(this.project,
          (res) => {
            console.log(res);
            this.navigateToDashboard();
          },
          (err) => {
            console.error(err);
          },
        );
    }

    private getAddRepositoryButtonStyle() {
        if(this.isRepositoryComplete()) {
            return ['btn-primary'];
        } else {
            return ['btn-disabled'];
        }
    }

    private isRepositoryComplete() {
        return this.newRepository.name
            && this.newRepository.url
            && this.newRepository.sonarQubeUrl
            && this.newRepository.sonarComponentKey;
    }

    private navigateToDashboard() {
        this.router.navigateByUrl('/pages/dashboard');
    }
}
