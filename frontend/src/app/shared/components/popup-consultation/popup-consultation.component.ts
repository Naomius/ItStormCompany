import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NewRequestsService} from "../../services/new-requests.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-popup-consultation',
  templateUrl: './popup-consultation.component.html',
  styleUrls: ['./popup-consultation.component.scss']
})
export class PopupConsultationComponent {

  @ViewChild('popupConsultation')
  popupConsultation!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  isSuccessOrder: boolean = false;
  isErrorOrder: boolean = false;

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
              private requestService: NewRequestsService) {
  }

  popupFormConsultation = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,7}$')]],
  })

  creatOrder(): void {
    this.popupFormConsultation.markAllAsTouched();
    if (this.popupFormConsultation.valid && this.popupFormConsultation.value.name && this.popupFormConsultation.value.phone) {
      this.subscriptionOrder = this.requestService.getConsultation(this.popupFormConsultation.value.name, this.popupFormConsultation.value.phone)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this.isSuccessOrder = true;
              this.isErrorOrder = false;
            }
          },
          error: (error: HttpErrorResponse) => {
            this.isErrorOrder = true;
          }
        })
    }
  }

  openPopup(){
    this.dialogRef = this.dialog.open(this.popupConsultation);
    this.dialogRef.backdropClick();
  }

  closePopup(): void {
    this.dialogRef?.close();
    this.popupFormConsultation.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

}
