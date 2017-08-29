import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';

@Component({
  moduleId: module.id,
  selector: 'app-alert',
  templateUrl: 'src/app/components/directives/alert.component.html'
})

export class AlertComponent implements OnInit{
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
}
