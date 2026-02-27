import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-purchase-history',
    standalone: true,
    imports: [CommonModule, TableModule, TagModule],
    templateUrl: './purchase-history.html'
})
export class PurchaseHistoryComponent {
    bookService = inject(BookService);

    purchases = computed(() =>
        this.bookService.transactions().filter(t => t.type === 'purchase')
    );
}
