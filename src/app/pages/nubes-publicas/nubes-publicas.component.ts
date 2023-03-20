import { Component } from '@angular/core';

@Component({
  selector: 'app-nubes-publicas',
  templateUrl: './nubes-publicas.component.html',
  styleUrls: ['./nubes-publicas.component.css']
})
export class NubesPublicasComponent {
  cloud_1 : string = 'Azure';
  cloud_2 : string = 'AWS';
  cloud_3 : string = 'Google Cloud';
  cloud_4 : string = 'Oracle Cloud';
}
