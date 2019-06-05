import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../@shared/models/project.model';
import { ProjectRepo } from '../../@shared/models/projectRepo.model';
import { ProjectService } from '../../@shared/services/project.service';

@Component({
    selector: 'ngx-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss']
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

        // Mock data
        const repo1: ProjectRepo = new ProjectRepo();
        repo1.name = 'Repository 1';
        repo1.url = 'http://vcs/repository1';
        repo1.sonarQubeUrl = 'http://sonar:9000/repo1';
        repo1.sonarComponentKey = 'sonar:repository1';

        const repo2: ProjectRepo = new ProjectRepo();
        repo2.name = 'Repository 2';
        repo2.url = 'http://vcs/repository2';
        repo2.sonarQubeUrl = 'http://sonar:9000/repo2';
        repo2.sonarComponentKey = 'sonar:repository2';

        this.project = new Project([repo1, repo2]);
    }

    private removeRepository(repository) {
        console.log('Removing repository', repository);
        this.project.projectRepos.forEach( (item, idx) => {
            if(item === repository) {
                this.project.projectRepos.splice(idx, 1);
            }
        });
    }

    private addRepository() {
        console.log('Adding repository', this.newRepository);
        this.project.projectRepos.push(this.newRepository);
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
          }
        );
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

    private navigateToDashboard() {
        this.router.navigateByUrl('/pages/dashboard');
    }
}
