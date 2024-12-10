import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarHighlight]',
  standalone: true,
})
export class NavbarHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log('Directive initialization!');
    console.log(this.elRef.nativeElement);

    this.renderer.listen(
      this.elRef.nativeElement,
      'click',
      this.clickHandlerAddColor.bind(this)
    );
  }
  clickHandlerAddColor() {
    this.removeActiveClass();
    this.renderer.addClass(this.elRef.nativeElement, 'navbar-list-item');
  }

  removeActiveClass() {
    const links = this.elRef.nativeElement.parentElement.querySelectorAll('li');
    links.forEach((link: HTMLElement) => {
      this.renderer.removeClass(link, 'navbar-list-item');
    });
  }
}
