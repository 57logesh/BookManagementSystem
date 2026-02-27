import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    TextareaModule,
    TagModule,
    ToastModule,
    SelectModule,
    IconField,
    InputIcon,
  ],
  providers: [MessageService],
  templateUrl: './inventory.html'
})
export class InventoryComponent {
  bookService = inject(BookService);
  categoryService = inject(CategoryService);
  messageService = inject(MessageService);

  bookDialog = false;
  editMode = signal(false);
  book: Partial<Book> = {};

  openNew() {
    this.book = { stock: 0 };
    this.editMode.set(false);
    this.bookDialog = true;
  }

  editBook(book: Book) {
    this.book = { ...book };
    this.editMode.set(true);
    this.bookDialog = true;
  }

  deleteBook(book: Book) {
    if (confirm(`Are you sure you want to delete ${book.title}?`)) {
      this.bookService.deleteBook(book.id);
      this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Book removed from inventory' });
    }
  }

  hideDialog() {
    this.bookDialog = false;
  }

  saveBook() {
    if (this.book.title?.trim()) {
      if (this.editMode()) {
        this.bookService.updateBook(this.book as Book);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Book details updated' });
      } else {
        this.book.id = Math.floor(1000 + Math.random() * 9000).toString();
        this.bookService.addBook(this.book as Book);
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'New book added safely' });
      }
      this.bookDialog = false;
      this.book = {};
    }
  }
}
