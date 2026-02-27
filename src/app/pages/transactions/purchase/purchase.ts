import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { SupplierService } from '../../../services/supplier.service';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, InputNumberModule, ButtonModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './purchase.html'
})
export class PurchaseComponent {
  bookService = inject(BookService);
  supplierService = inject(SupplierService);
  messageService = inject(MessageService);

  selectedBookId = signal<string>('');
  selectedSupplierId = signal<string>('');
  quantity = signal<number>(0);
  price = signal<number>(0);
  currentBook = signal<any>(null);

  onBookSelect(event: any) {
    const id = this.selectedBookId();
    const book = this.bookService.books().find(b => b.id === id);
    if (book) {
      this.currentBook.set(book);
      this.price.set(book.purchasePrice);
    }
  }

  confirmPurchase() {
    const id = this.selectedBookId();
    const suppId = this.selectedSupplierId();
    const q = this.quantity();
    const p = this.price();
    const book = this.currentBook();

    if (id && q && p && book) {
      const supplier = this.supplierService.suppliers().find(s => s.id === suppId);
      this.bookService.purchaseBook(id, q, p, suppId, supplier?.name);
      this.messageService.add({ severity: 'success', summary: 'Purchase Successful', detail: `Added ${q} units of ${book.title}` });
      this.clear();
    }
  }

  clear() {
    this.selectedBookId.set('');
    this.selectedSupplierId.set('');
    this.quantity.set(0);
    this.price.set(0);
    this.currentBook.set(null);
  }
}
