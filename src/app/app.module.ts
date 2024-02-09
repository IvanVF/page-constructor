import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { ElementsLibraryComponent } from './components/dashboard/elements-library/elements-library.component';
import { WorkingPlaceComponent } from './components/dashboard/working-place/working-place.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeftSidebarComponent } from './components/dashboard/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/dashboard/right-sidebar/right-sidebar.component';
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ElementsLibraryComponent,
    WorkingPlaceComponent,
    DashboardComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
