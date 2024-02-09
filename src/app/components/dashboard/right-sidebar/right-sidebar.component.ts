import { Component } from '@angular/core';
import {DashboardLocalService} from "../dashboard-local.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss', '../dashboard.component.scss', '../../../../assets/element_styles/switcher.scss']
})
export class RightSidebarComponent {

  isCommonTab: boolean = true;

  carText: string = "";
  carDescription: string = "";
  carDefaultValue: string = "";
  carDirectory: string = "";


  /**
   * Выделенный элемент
   */
  focusedElement: BehaviorSubject<HTMLElement> = this.localService.focusedElement;

  elementInnerText: string = "";

  elementHeight: number = 0;

  elementWidth: number = 0;

  elementBackgroundColor: string = "";

  elementTextColor: string = "";

  constructor(private localService: DashboardLocalService) {
  }

  ngOnInit(): void {
    this.focusedElement.subscribe(element => {
      this.elementInnerText = element.innerText;
      this.elementHeight = element.offsetHeight;
      this.elementWidth = element.offsetWidth;
      this.elementBackgroundColor = window.getComputedStyle(element, null).getPropertyValue('background-color');
      this.elementTextColor = element.style.color;
    })
  }

  ngOnDestroy(): void {
    this.focusedElement.unsubscribe();
  }

  applyChanges() {
    let element: HTMLElement = this.focusedElement.getValue();
    if (element.nodeName === "BUTTON") {
      element.innerText = this.elementInnerText;
    }
    element.style.height = this.elementHeight + "px";
    element.style.width = this.elementWidth + "px";
    element.style.backgroundColor = this.elementBackgroundColor;
    element.style.color = this.elementTextColor;

  }

  chooseCommonTab() {
    this.isCommonTab = true;
  }

  chooseDescriptionTab() {
    this.isCommonTab = false;
  }

}
