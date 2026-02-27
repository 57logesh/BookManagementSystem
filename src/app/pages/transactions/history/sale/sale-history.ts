import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-sale-history',
    standalone: true,
    imports: [CommonModule, TableModule, TagModule],
    templateUrl: './sale-history.html'
})
export class SaleHistoryComponent {
    bookService = inject(BookService);

    sales = computed(() =>
        this.bookService.transactions().filter(t => t.type === 'sale')
    );
}
