import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-suppliers',
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
    templateUrl: './suppliers.html'
})
export class SuppliersComponent {
    supplierService = inject(SupplierService);
    messageService = inject(MessageService);

    displayDialog = false;
    editMode = signal(false);
    supplier: Partial<Supplier> = {};

    openNew() {
        this.supplier = {};
        this.editMode.set(false);
        this.displayDialog = true;
    }

    editSupplier(supplier: Supplier) {
        this.supplier = { ...supplier };
        this.editMode.set(true);
        this.displayDialog = true;
    }

    deleteSupplier(supplier: Supplier) {
        if (confirm(`Are you sure you want to delete ${supplier.name}?`)) {
            this.supplierService.deleteSupplier(supplier.id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Supplier removed' });
        }
    }

    hideDialog() {
        this.displayDialog = false;
    }

    saveSupplier() {
        if (this.supplier.name?.trim()) {
            if (this.editMode()) {
                this.supplierService.updateSupplier(this.supplier as Supplier);
                this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Supplier updated' });
            } else {
                this.supplier.id = 'SUPP-' + Math.floor(1000 + Math.random() * 9000).toString();
                this.supplierService.addSupplier(this.supplier as Supplier);
                this.messageService.add({ severity: 'success', summary: 'Added', detail: 'New supplier added' });
            }
            this.displayDialog = false;
            this.supplier = {};
        }
    }
}
