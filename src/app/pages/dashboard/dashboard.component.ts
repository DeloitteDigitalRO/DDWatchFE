import { Component } from '@angular/core';
@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


    view: any[] = [120, 120];

    single = [
        {
        "name": "Germany",
        "value": 60
        },
        {
        "name": "USA",
        "value": 40
        }
    ];

    colorScheme = {
        domain: ['#d2d2d2', '#ffffff']
    };

    projects = [{ name: "HORNET", date: "11.05.2019", currentStaffing: "24", maxStaffing: "25"},
                { name: "PRU", date: "11.05.2019", currentStaffing: "11", maxStaffing: "14"},
                { name: "CYCLONES", date: "11.05.2019", currentStaffing: "18", maxStaffing: "25"}]


}
