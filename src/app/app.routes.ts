import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { InventoryComponent } from './pages/inventory/inventory';
import { CategoriesComponent } from './pages/categories/categories';
import { CustomersComponent } from './pages/customers/customers';
import { SuppliersComponent } from './pages/suppliers/suppliers';
import { PurchaseComponent } from './pages/transactions/purchase/purchase';
import { SaleComponent } from './pages/transactions/sale/sale';
import { PurchaseHistoryComponent } from './pages/transactions/history/purchase/purchase-history';
import { SaleHistoryComponent } from './pages/transactions/history/sale/sale-history';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customers', component: CustomersComponent },
            { path: 'suppliers', component: SuppliersComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: 'transaction/purchase', component: PurchaseComponent },
            { path: 'transaction/sale', component: SaleComponent },
            { path: 'history/purchase', component: PurchaseHistoryComponent },
            { path: 'history/sale', component: SaleHistoryComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
