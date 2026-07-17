import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="px-6 py-3 text-xs text-neutral-500 border-t">
      Recipe Manager — built with Angular & PrimeNG
    </footer>
  `,
})
export class FooterComponent {}