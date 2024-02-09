import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardLocalService {

  /**
   * Выделенный элемент
   */
  focusedElement: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(<HTMLDivElement>(document.createElement('div')));

  constructor() { }
}
