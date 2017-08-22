import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ApartmentListComponent} from "./apartment_list/apartment-list.component";
import {ApartmentCardComponent} from "./apartment_list/apartment-card.component";

@NgModule({
  declarations: [
    AppComponent,
    ApartmentListComponent,
    ApartmentCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
