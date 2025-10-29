export type Customer = {
    name: string;
    email: string;
    phone?: string;
    orders: number;
    totalSpend: number;
    lastOrderAt?: string;
};
