import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  links = [
    { path: '/dashboard', label: 'Dashboard', icon: 'pi pi-home' },
    { path: '/recipes', label: 'Recipes', icon: 'pi pi-book' },
    { path: '/tags', label: 'Tags', icon: 'pi pi-tags' },
  ];
}