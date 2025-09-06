import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStructuredDataDirective]',
})
export class StructuredDataDirective {
  @Input('appStructuredData') data!: Record<string, any>;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    if (!this.data) return;

    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    script.text = JSON.stringify(this.data, null, 2);

    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
