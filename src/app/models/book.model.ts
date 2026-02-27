export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    price: number;
    purchasePrice: number;
    stock: number;
    category: string;
    description: string;
    imageUrl?: string;
}

export interface Transaction {
    id: string;
    bookId: string;
    bookTitle: string;
    type: 'purchase' | 'sale';
    quantity: number;
    date: string;
    price: number;
    total: number;
    customerId?: string;
    customerName?: string;
    supplierId?: string;
    supplierName?: string;
}
