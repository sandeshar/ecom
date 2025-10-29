export type OrderItemProduct = {
    _id: string;
    name?: string;
    heroImage?: string | null;
};

export type OrderItem = {
    product?: string | OrderItemProduct;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    heroImage?: string;
};

export type Order = {
    _id: string;
    orderNumber: string;
    status: "Processing" | "Fulfilled" | "Awaiting pickup" | "Refund requested" | "Cancelled";
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
    items: OrderItem[];
    customer: {
        name: string;
        email: string;
        phone?: string;
    };
    billingAddress: {
        line1: string;
        line2?: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
    };
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
    metadata?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
};

export type OrderListResponse = {
    data: Order[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};
