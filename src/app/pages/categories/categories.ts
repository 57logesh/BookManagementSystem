import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        TextareaModule,
        ToastModule,
        IconField,
        InputIcon
    ],
    providers: [MessageService],
    templateUrl: './categories.html'
})
export class CategoriesComponent {
    categoryService = inject(CategoryService);
    messageService = inject(MessageService);

    displayDialog = false;
    editMode = signal(false);
    category: Partial<Category> = {};

    openNew() {
        this.category = {};
        this.editMode.set(false);
        this.displayDialog = true;
    }

    editCategory(category: Category) {
        this.category = { ...category };
        this.editMode.set(true);
        this.displayDialog = true;
    }

    deleteCategory(category: Category) {
        if (confirm(`Are you sure you want to delete ${category.name}?`)) {
            this.categoryService.deleteCategory(category.id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Category removed' });
        }
    }

    hideDialog() {
        this.displayDialog = false;
    }

    saveCategory() {
        if (this.category.name?.trim()) {
            if (this.editMode()) {
                this.categoryService.updateCategory(this.category as Category);
                this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Category updated' });
            } else {
                this.category.id = Math.random().toString(36).substr(2, 9);
                this.categoryService.addCategory(this.category as Category);
                this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Category added' });
            }
            this.displayDialog = false;
            this.category = {};
        }
    }
}
