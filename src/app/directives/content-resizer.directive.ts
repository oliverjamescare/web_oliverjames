import { AfterViewChecked, Directive, ElementRef, Input, OnInit, Renderer2, } from '@angular/core';

@Directive({
    selector: '[appContentResizer]'
})
export class ContentResizerDirective implements AfterViewChecked, OnInit
{
    @Input() relativeTo: HTMLElement;
    constructor(private elementReference: ElementRef, private renderer: Renderer2) {}
    private paddingTop: number = 20;

    ngOnInit() //to fix bad rendering on Google Chrome
    {
        setTimeout(() => {
            let height = this.relativeTo.offsetHeight;
            this.renderer.setStyle(this.elementReference.nativeElement, 'margin-top', (height + this.paddingTop)  + "px");
        },200)
    }

    ngAfterViewChecked()
    {
        let height = this.relativeTo.offsetHeight;
        this.renderer.setStyle(this.elementReference.nativeElement, 'margin-top', (height + this.paddingTop)  + "px");
    }
}
