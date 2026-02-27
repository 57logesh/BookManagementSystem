import { Injectable, signal, effect } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private storageKey = 'bookstore_customers';
    customers = signal<Customer[]>(this.loadCustomers());

    constructor() {
        effect(() => {
            localStorage.setItem(this.storageKey, JSON.stringify(this.customers()));
        });
    }

    generateUniqueId(): string {
        let id = '';
        while (true) {
            id = Math.floor(1000 + Math.random() * 9000).toString();
            const exists = this.customers().some(c => c.id === id);
            if (!exists) break;
        }
        return id;
    }

    private loadCustomers(): Customer[] {
        const data = localStorage.getItem(this.storageKey);
        if (data) return JSON.parse(data);

        // Sample Data
        return [
            { id: 'c1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', totalPurchases: 0 },
            { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', totalPurchases: 0 }
        ];
    }

    addCustomer(customer: Customer) {
        this.customers.update(prev => [...prev, customer]);
    }

    updateCustomer(updatedCustomer: Customer) {
        this.customers.update(prev =>
            prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
        );
    }

    deleteCustomer(id: string) {
        this.customers.update(prev => prev.filter(c => c.id !== id));
    }
}
