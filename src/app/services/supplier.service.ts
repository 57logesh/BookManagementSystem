import { Injectable, signal, effect } from '@angular/core';
import { Supplier } from '../models/supplier.model';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private storageKey = 'bookstore_suppliers';
    suppliers = signal<Supplier[]>(this.loadSuppliers());

    constructor() {
        effect(() => {
            localStorage.setItem(this.storageKey, JSON.stringify(this.suppliers()));
        });
    }

    private loadSuppliers(): Supplier[] {
        const data = localStorage.getItem(this.storageKey);
        if (data) return JSON.parse(data);

        // Sample Data
        return [
            { id: 'S1', name: 'Global Book Dist', contactPerson: 'Mark Smith', email: 'mark@globalbooks.com', phone: '555-0199' },
            { id: 'S2', name: 'Elite Publishing', contactPerson: 'Sarah Jones', email: 'sarah@elitepub.com', phone: '555-0122' }
        ];
    }

    addSupplier(supplier: Supplier) {
        this.suppliers.update(prev => [...prev, supplier]);
    }

    updateSupplier(updatedSupplier: Supplier) {
        this.suppliers.update(prev =>
            prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s)
        );
    }

    deleteSupplier(id: string) {
        this.suppliers.update(prev => prev.filter(s => s.id !== id));
    }
}
