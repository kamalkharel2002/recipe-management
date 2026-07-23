import { Component } from '@angular/core';
import { TagListComponent } from '../../containers/tag-list/tag-list.component';

@Component({
  selector: 'app-tag-list-page',
  standalone: true,
  imports: [TagListComponent],
  template: `<app-tag-list />`,
})
export class TagListPageComponent {}
