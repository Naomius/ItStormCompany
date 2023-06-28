import {Component, ElementRef, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {NewRequestsService} from "../../services/new-requests.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-popup-order',
  templateUrl: './popup-order.component.html',
  styleUrls: ['./popup-order.component.scss']
})
export class PopupOrderComponent implements OnDestroy{

  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  isSuccessOrder: boolean = false;
  isErrorOrder: boolean = false;

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
              private requestService: NewRequestsService) {
  }


  popupForm = this.fb.group({
    service: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,7}$')]],
  })

  creatOrder(): void {
    this.popupForm.markAllAsTouched();
    if (this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone && this.popupForm.value.service) {
      this.subscriptionOrder = this.requestService.getCreatOrder(this.popupForm.value.name, this.popupForm.value.phone, this.popupForm.value.service)
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


  openPopup(value: string){
    this.popupForm.patchValue({
      service: value
    });
    this.subscription = this.userService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        this.popupForm.patchValue({
          name: (data as UserInfoType).name
        });
      })
    this.dialogRef = this.dialog.open(this.popup);
    this.dialogRef.backdropClick();
  }

  closePopup(): void {
    this.dialogRef?.close();
    this.popupForm.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
