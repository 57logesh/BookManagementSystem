import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { CustomerService } from '../../../services/customer.service';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, InputNumberModule, ButtonModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './sale.html'
})
export class SaleComponent {
  bookService = inject(BookService);
  customerService = inject(CustomerService);
  messageService = inject(MessageService);

  selectedBookId = signal<string>('');
  selectedCustomerId = signal<string>('');
  quantity = signal<number>(0);
  price = signal<number>(0);
  currentBook = signal<any>(null);

  onBookSelect(event: any) {
    const id = this.selectedBookId();
    const book = this.bookService.books().find(b => b.id === id);
    if (book) {
      this.currentBook.set(book);
      this.price.set(book.price);
      this.quantity.set(1);
    }
  }

  confirmSale() {
    const id = this.selectedBookId();
    const custId = this.selectedCustomerId();
    const q = this.quantity();
    const p = this.price();
    const book = this.currentBook();

    if (id && q && p && book) {
      const customer = this.customerService.customers().find(c => c.id === custId);
      this.bookService.saleBook(id, q, p, custId, customer?.name);
      this.messageService.add({ severity: 'success', summary: 'Sale Recorded', detail: `Sold ${q} units of ${book.title}` });
      this.clear();
    }
  }

  clear() {
    this.selectedBookId.set('');
    this.selectedCustomerId.set('');
    this.quantity.set(0);
    this.price.set(0);
    this.currentBook.set(null);
  }
}
