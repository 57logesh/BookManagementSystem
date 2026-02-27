import { Injectable, signal } from '@angular/core';
import { Book, Transaction } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private STORAGE_KEY_BOOKS = 'bookstore_books';
    private STORAGE_KEY_TRANS = 'bookstore_transactions';

    books = signal<Book[]>([]);
    transactions = signal<Transaction[]>([]);

    constructor() {
        this.loadInitialData();
    }

    private generateUniqueId(): string {
        let id = '';
        while (true) {
            id = Math.floor(1000 + Math.random() * 9000).toString();
            const exists = this.transactions().some(t => t.id === id);
            if (!exists) break;
        }
        return id;
    }

    private loadInitialData() {
        const storedBooks = localStorage.getItem(this.STORAGE_KEY_BOOKS);
        const storedTrans = localStorage.getItem(this.STORAGE_KEY_TRANS);

        if (storedBooks) {
            this.books.set(JSON.parse(storedBooks));
        } else {
            this.seedData();
        }

        if (storedTrans) {
            this.transactions.set(JSON.parse(storedTrans));
        }
    }

    private seedData() {
        const sampleBooks: Book[] = [
            {
                id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                isbn: '978-0743273565',
                price: 15.99,
                purchasePrice: 10.00,
                stock: 25,
                category: 'Fiction',
                description: 'A story of wealth, class, and the American dream in the 1920s.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg'
            },
            {
                id: '2',
                title: '1984',
                author: 'George Orwell',
                isbn: '978-0451524935',
                price: 12.99,
                purchasePrice: 8.50,
                stock: 40,
                category: 'Dystopian',
                description: 'A chilling prophecy about the future of authoritarianism.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348927776i/157993.jpg'
            },
            {
                id: '3',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                isbn: '978-0061120084',
                price: 18.50,
                purchasePrice: 12.00,
                stock: 15,
                category: 'Classic',
                description: 'A classic of modern American literature, exploring prejudice and injustice.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553388139i/2657.jpg'
            }
        ];
        this.books.set(sampleBooks);
        this.saveBooks();
    }

    private saveBooks() {
        localStorage.setItem(this.STORAGE_KEY_BOOKS, JSON.stringify(this.books()));
    }

    private saveTransactions() {
        localStorage.setItem(this.STORAGE_KEY_TRANS, JSON.stringify(this.transactions()));
    }

    addBook(book: Book) {
        this.books.update(b => [...b, book]);
        this.saveBooks();
    }

    updateBook(book: Book) {
        this.books.update(b => b.map(x => x.id === book.id ? book : x));
        this.saveBooks();
    }

    deleteBook(id: string) {
        this.books.update(b => b.filter(x => x.id !== id));
        this.saveBooks();
    }

    purchaseBook(bookId: string, quantity: number, price: number, supplierId?: string, supplierName?: string) {
        const bookIndex = this.books().findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            const updatedBooks = [...this.books()];
            updatedBooks[bookIndex].stock += quantity;
            this.books.set(updatedBooks);
            this.saveBooks();

            const transaction: Transaction = {
                id: this.generateUniqueId(),
                bookId,
                bookTitle: updatedBooks[bookIndex].title,
                type: 'purchase',
                quantity,
                date: new Date().toISOString(),
                price,
                total: quantity * price,
                supplierId,
                supplierName
            };
            this.transactions.update(t => [transaction, ...t]);
            this.saveTransactions();
        }
    }

    saleBook(bookId: string, quantity: number, price: number, customerId?: string, customerName?: string) {
        const bookIndex = this.books().findIndex(b => b.id === bookId);
        if (bookIndex !== -1 && this.books()[bookIndex].stock >= quantity) {
            const updatedBooks = [...this.books()];
            updatedBooks[bookIndex].stock -= quantity;
            this.books.set(updatedBooks);
            this.saveBooks();

            const transaction: Transaction = {
                id: this.generateUniqueId(),
                bookId,
                bookTitle: updatedBooks[bookIndex].title,
                type: 'sale',
                quantity,
                date: new Date().toISOString(),
                price,
                total: quantity * price,
                customerId,
                customerName
            };
            this.transactions.update(t => [transaction, ...t]);
            this.saveTransactions();
        }
    }
}
