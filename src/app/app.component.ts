import { Component } from '@angular/core';
import { MicrosoftApiService } from './services/microsoft-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authorizationUrl: string;
  title = 'proy-adminlte3';

  constructor(private openIdService: MicrosoftApiService) {
  }

  async getAuthorizationUrl() {
    console.log('getAuthorizationUrl');
  }
}
