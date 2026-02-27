import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ToastModule,
        IconField,
        InputIcon
    ],
    providers: [MessageService],
    templateUrl: './customers.html'
})
export class CustomersComponent {
    customerService = inject(CustomerService);
    messageService = inject(MessageService);

    displayDialog = false;
    editMode = signal(false);
    customer: Partial<Customer> = {};

    openNew() {
        this.customer = {};
        this.editMode.set(false);
        this.displayDialog = true;
    }

    editCustomer(customer: Customer) {
        this.customer = { ...customer };
        this.editMode.set(true);
        this.displayDialog = true;
    }

    deleteCustomer(customer: Customer) {
        if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
            this.customerService.deleteCustomer(customer.id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Customer removed' });
        }
    }

    hideDialog() {
        this.displayDialog = false;
    }

    saveCustomer() {
        if (this.customer.name?.trim() && this.customer.email?.trim()) {
            if (this.editMode()) {
                this.customerService.updateCustomer(this.customer as Customer);
                this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Customer updated' });
            } else {
                this.customer.id = this.customerService.generateUniqueId();
                this.customer.totalPurchases = 0;
                this.customerService.addCustomer(this.customer as Customer);
                this.messageService.add({ severity: 'success', summary: 'Added', detail: 'New customer registered' });
            }
            this.displayDialog = false;
            this.customer = {};
        }
    }
}
