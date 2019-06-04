import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit {
  @Input() deliveryReport: Object;

  constructor() {
  }

  ngOnInit() {
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
