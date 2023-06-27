import {Component, ViewChild} from '@angular/core';
import {PopupConsultationComponent} from "../../components/popup-consultation/popup-consultation.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @ViewChild(PopupConsultationComponent)
  private popupConsultationComp!: PopupConsultationComponent;

  openPopupCons(): void {
    this.popupConsultationComp.openPopup()
  }

}
