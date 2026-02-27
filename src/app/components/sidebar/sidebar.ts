import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, ButtonModule],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  mainMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Customers', icon: 'pi pi-users', routerLink: '/customers' },
    { label: 'Suppliers', icon: 'pi pi-truck', routerLink: '/suppliers' },
    { label: 'Categories', icon: 'pi pi-tags', routerLink: '/categories' },
    { label: 'Inventory', icon: 'pi pi-box', routerLink: '/inventory' }
  ];

  transactionMenu: MenuItem[] = [
    { label: 'Purchases', icon: 'pi pi-cart-plus', routerLink: '/transaction/purchase' },
    { label: 'Sales', icon: 'pi pi-shopping-cart', routerLink: '/transaction/sale' }
  ];

  historyMenu: MenuItem[] = [
    { label: 'Purchase History', icon: 'pi pi-history', routerLink: '/history/purchase' },
    { label: 'Sales History', icon: 'pi pi-receipt', routerLink: '/history/sale' }
  ];
}
