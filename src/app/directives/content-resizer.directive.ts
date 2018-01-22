import { AfterViewChecked, Directive, ElementRef, Input, Renderer2, } from '@angular/core';

@Directive({
    selector: '[appContentResizer]'
})
export class ContentResizerDirective implements AfterViewChecked
{
    @Input() relativeTo: HTMLElement;
    constructor(private elementReference: ElementRef, private renderer: Renderer2) {}
    private paddingTop: number = 20;

    ngAfterViewChecked()
    {
        let height = this.relativeTo.offsetHeight;
        this.renderer.setStyle(this.elementReference.nativeElement, 'margin-top', (height + this.paddingTop)  + "px");
    }
}
