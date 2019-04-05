import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><b>Deloitte Digital Hornet team</b> 2019</span>
    <div class="socials">
      <a href="https://www.facebook.com/deloittedigitalro" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/company/deloitte-digital-romania" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
