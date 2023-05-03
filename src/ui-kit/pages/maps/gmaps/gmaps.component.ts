import { Component } from '@angular/core';

@Component({
  selector: 'lthn-ui-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent {
  readonly position = { lat: 51.678418, lng: 7.809007 };
}