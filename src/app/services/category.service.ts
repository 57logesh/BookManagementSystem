import { Injectable, signal, effect } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private storageKey = 'bookstore_categories';
    categories = signal<Category[]>(this.loadCategories());

    constructor() {
        effect(() => {
            localStorage.setItem(this.storageKey, JSON.stringify(this.categories()));
        });
    }

    private loadCategories(): Category[] {
        const data = localStorage.getItem(this.storageKey);
        if (data) return JSON.parse(data);

        // Default categories
        return [
            { id: '1', name: 'Fiction' },
            { id: '2', name: 'Non-Fiction' },
            { id: '3', name: 'Classic' },
            { id: '4', name: 'Dystopian' },
            { id: '5', name: 'Science Fiction' }
        ];
    }

    addCategory(category: Category) {
        this.categories.update(prev => [...prev, category]);
    }

    updateCategory(updatedCategory: Category) {
        this.categories.update(prev =>
            prev.map(c => c.id === updatedCategory.id ? updatedCategory : c)
        );
    }

    deleteCategory(id: string) {
        this.categories.update(prev => prev.filter(c => c.id !== id));
    }
}
