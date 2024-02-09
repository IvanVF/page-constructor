import {Component, ComponentFactoryResolver, ElementRef, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDrag, DragDrop} from "@angular/cdk/drag-drop";
import {DashboardLocalService} from "../dashboard-local.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-elements-library',
  templateUrl: './elements-library.component.html',
  styleUrls: ['./elements-library.component.scss', '../../../../assets/element_styles/dialog.scss', '../../../../assets/element_styles/switcher.scss']
})
export class ElementsLibraryComponent {
  @ViewChild('originalElement') originalElement: CdkDrag;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  /**
   * Страница в библиотеке
   */
  page: HTMLDivElement

  /**
   * Кнопка в библиотеке
   */
  button: HTMLButtonElement;

  /**
   * Инпут текст
   */
  inputText: HTMLInputElement;

  /**
   * Область для текста
   */
  textarea: HTMLTextAreaElement;



  /**
   * Селект
   */
  select: HTMLDivElement;

  /**
   * Инпут ссылка
   */
  inputLink: HTMLInputElement;

  /**
   * Кастомный переключатель
   */
  switcher: HTMLLabelElement;

  /**
   * Инпут чекбокс
   */
  inputCheckBox: HTMLInputElement;

  /**
   * Стикер
   */
  sticker: HTMLTextAreaElement;

  /**
   * Модальное окно смены текста элемента
   */
  dialogChooseElementName: HTMLDialogElement;

  /**
   * Рабочая область
   */
  workingPlace: HTMLBodyElement;

  pageId = 0;
  btnId = 0;
  inputTextId = 0;
  textareaId = 0;
  tableId = 0;
  selectId = 0;
  inputLinkId = 0;
  switcherId = 0;
  inputCheckBoxId = 0;
  stickerId = 0;

  newElementName: string = "";

  /**
   * Выделенный элемент
   */
  focusedElement: BehaviorSubject<HTMLElement> = this.localService.focusedElement;

  createdElements: HTMLElement[] = [];

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private resolver: ComponentFactoryResolver,
              private dragDrop: DragDrop,
              private localService: DashboardLocalService) {
  }

  ngOnInit(): void {
    this.page = <HTMLDivElement>document.getElementById("library_page");
    this.button = <HTMLButtonElement>document.getElementById("library_button");
    this.inputText = <HTMLInputElement>document.getElementById("library_input");
    this.textarea = <HTMLTextAreaElement>document.getElementById("library_textarea");
    this.select = <HTMLDivElement>document.getElementById("select_library");
    this.inputLink = <HTMLInputElement>document.getElementById("library_link");
    this.switcher = <HTMLLabelElement>document.getElementById("library_switcher");
    this.inputCheckBox = <HTMLInputElement>document.getElementById("library_checkbox");
    this.sticker = <HTMLTextAreaElement>document.getElementById("library_sticker");
    this.workingPlace = <HTMLBodyElement>document.getElementById("working_place_anchor");

    this.dialogChooseElementName = <HTMLDialogElement>document.getElementById("dialog_choose_element_name");
    this.workingPlace.onclick = () => {
      this.createdElements.forEach(element => {element.classList.remove("focused-element")});
      this.focusedElement.next(<HTMLDivElement>(document.createElement('div')));
    }


  }

  createNewElement(htmlElement: HTMLElement, nameRus: string, nameEng: string, idIncrement: number) {
    const htmlElementCopy: any = htmlElement.cloneNode(true);
    const workingPlace = this.workingPlace;
    const focusedElement: BehaviorSubject<HTMLElement> = this.focusedElement;

    htmlElementCopy.id = String(nameEng + "_" + idIncrement);
    htmlElementCopy.style.cursor = "grab";
    htmlElementCopy.style.display = "inline-block";


    workingPlace.prepend(htmlElementCopy);
    this.createdElements.push(htmlElementCopy);

    idIncrement++;

    // ПКМ выделяет элемент
    // Запрет контекстного меню при клике ПКМ на элемент
    htmlElementCopy.oncontextmenu = () => {
      this.createdElements.forEach(element => {element.classList.remove("focused-element")})
      htmlElementCopy.classList.add("focused-element");
      this.focusedElement.next(htmlElementCopy);
      return false;
    }

    htmlElementCopy.onmousedown = (event: { pageX: number; pageY: number; ctrlKey: boolean; button: number; clientX: number, clientY: number;}) => {
      // Сдвиг чтобы взять за край элемента и учёт прокрутки страницы
      let shiftX = event.clientX - htmlElementCopy.getBoundingClientRect().left + window.pageXOffset;
      let shiftY = event.clientY - htmlElementCopy.getBoundingClientRect().top + window.pageYOffset;

      // Нажатие ЛКМ перетаскивает элемент
      if (event.button === 0) {
        htmlElementCopy.style.position = 'absolute';
        htmlElementCopy.style.zIndex = 100;


        // ...and put that absolutely positioned button_move under the cursor
        moveAt(event.pageX, event.pageY);

        // centers the button_move at (pageX, pageY) coordinates
        function moveAt(pageX: number, pageY: number) {
          const coords = workingPlace.getBoundingClientRect();
          let left = (pageX - coords.left - shiftX) < 0 ? 0 : pageX - coords.left - shiftX;
          let top = (pageY - coords.top -  shiftY) < 0 ? 0 :  pageY - coords.top -  shiftY;

          left = left > (coords.width - htmlElementCopy.offsetWidth) ? coords.width - htmlElementCopy.offsetWidth : left;
          top = top > coords.height ? coords.height : top;

          htmlElementCopy.style.left = left + 'px';
          htmlElementCopy.style.top =  top +'px';
        }

        function onMouseMove(event: { pageX: number; pageY: number; }) {
          moveAt(event.pageX, event.pageY);
        }

        // (3) move the button_move on mousemove
        // @ts-ignore
        document.addEventListener('mousemove', onMouseMove);

        // (4) drop the button_move, remove unneeded handlers
        htmlElementCopy.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          htmlElementCopy.onmouseup = null;
          htmlElementCopy.style.zIndex = htmlElementCopy.id.indexOf("page") === -1 ? 10 : 1;
        };

        workingPlace.onkeydown = function (event) {
          if (event.key === "Escape") {
            document.removeEventListener('mousemove', onMouseMove);
            htmlElementCopy.onmouseup = null;
          }
          if (event.code === "Delete") {
            focusedElement.getValue().remove();
            focusedElement.next(<HTMLDivElement>(document.createElement('div')));
          }
        }
      }

      return htmlElementCopy;
    }
  }

  createPageElement() {
    this.createNewElement(this.page, "Страница", "page", this.pageId);
  }

  createBtnElement() {
    this.createNewElement(this.button, "Кнопка", "button", this.btnId);
  }

  createTextElement() {
    this.createNewElement(this.inputText, "Текст", "input", this.inputTextId);
  }

  createTextAreaElement() {
    this.createNewElement(this.textarea, "Текстовое поле", "textarea", this.textareaId);
  }

  createSelectElement() {
    this.createNewElement(this.select, "Комбо бокс", "select", this.selectId);
  }

  createLinkElement() {
    this.createNewElement(this.inputLink, "Ссылка", "link", this.inputLinkId);
  }

  createCheckBoxElement() {
    this.createNewElement(this.inputCheckBox, "Инпут", "inputDatepicker", this.inputCheckBoxId);
  }

  createSwitcherElement() {
    this.createNewElement(this.switcher, "Переключатель", "switcher", this.switcherId);
  }

  createStickerElement() {
    this.createNewElement(this.sticker, "Стикер", "sticker", this.stickerId);
  }

  resetFocusedElement() {
    this.createdElements.forEach(element => {element.classList.remove("focused-element")});
    this.focusedElement.next(new HTMLElement());
  }

}
