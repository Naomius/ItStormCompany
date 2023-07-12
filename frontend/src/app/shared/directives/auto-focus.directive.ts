import { AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterViewInit{

  public constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
          this.el.nativeElement.focus()
        },500)
  }

}
