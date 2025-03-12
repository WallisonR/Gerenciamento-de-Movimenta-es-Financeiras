export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    type: 'entrada' | 'saida';
    amount: number;
    category_id: number;
    category?: Category;
    description: string;
    created_at: string;
    updated_at: string;
} 