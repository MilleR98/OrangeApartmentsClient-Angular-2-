import {Component, Input} from '@angular/core';
import {Apartment} from '../models/apartment';

@Component({
  selector: 'apartment-card',
  template: `
    <div style="border: 2px solid red; border-radius: 5px; margin: 5px; padding: 5px;">
      <h2>{{apartment.Title}}</h2>
      <div>{{apartment.City}}, {{apartment.Street}}, {{apartment.StreetNumber}}</div>
      <div>{{apartment.PostDate}}</div>
      <div>{{apartment.Price}}</div>
    </div>`
})

export class ApartmentCardComponent {
  @Input()
  apartment: Apartment;
}
