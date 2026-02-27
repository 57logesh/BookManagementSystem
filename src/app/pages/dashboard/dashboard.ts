import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TableModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  private bookService = inject(BookService);

  totalBooks = computed(() => this.bookService.books().length);
  stockValue = computed(() => this.bookService.books().reduce((acc, book) => acc + (book.stock * book.purchasePrice), 0));
  totalSales = computed(() => this.bookService.transactions().filter(t => t.type === 'sale').reduce((acc, t) => acc + t.total, 0));
  lowStockCount = computed(() => this.bookService.books().filter(b => b.stock < 10).length);
  lowStockBooks = computed(() => this.bookService.books().filter(b => b.stock < 10).slice(0, 5));
  recentTransactions = computed(() => this.bookService.transactions().slice(0, 5));
}
