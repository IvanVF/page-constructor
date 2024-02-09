import { Component } from '@angular/core';
// @ts-ignore
import * as html2Pdf from 'html2pdf.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  downloadPdf() {
    const workingPlace: HTMLBodyElement = <HTMLBodyElement>document.getElementById("working_place_anchor");
    html2Pdf(workingPlace, {
      filename: "doc.pdf",
      html2canvas: {useCORS: true}
    })
  }
}
