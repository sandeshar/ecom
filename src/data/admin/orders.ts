export const orderStatuses = ["Processing", "Fulfilled", "Awaiting pickup", "Refund requested"] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type OrderRow = {
    id: string;
    customer: string;
    email: string;
    status: OrderStatus;
    total: number;
    placedAt: string;
    fulfillmentEta: string;
    items: number;
};

export type TimelineEvent = {
    id: string;
    icon: string;
    title: string;
    description: string;
    timestamp: string;
};

export const orders: OrderRow[] = [
    {
        id: "#2055",
        customer: "Samuel Lee",
        email: "sam@collectivestudio.com",
        status: "Processing",
        total: 168,
        placedAt: "Oct 12, 2025 · 09:12",
        fulfillmentEta: "Today 5:00 PM",
        items: 3,
    },
    {
        id: "#2054",
        customer: "Nova Studio",
        email: "team@novastudio.co",
        status: "Fulfilled",
        total: 248,
        placedAt: "Oct 11, 2025 · 18:47",
        fulfillmentEta: "Delivered",
        items: 5,
    },
    {
        id: "#2053",
        customer: "Priya Desai",
        email: "priya@lumina.design",
        status: "Awaiting pickup",
        total: 96,
        placedAt: "Oct 11, 2025 · 16:20",
        fulfillmentEta: "Tomorrow 11:30 AM",
        items: 2,
    },
    {
        id: "#2052",
        customer: "Jordan Rivera",
        email: "jordan@email.com",
        status: "Processing",
        total: 128,
        placedAt: "Oct 11, 2025 · 13:05",
        fulfillmentEta: "Today 3:30 PM",
        items: 4,
    },
    {
        id: "#2051",
        customer: "Sasha Kim",
        email: "sasha@atelier.studio",
        status: "Refund requested",
        total: 52,
        placedAt: "Oct 10, 2025 · 20:31",
        fulfillmentEta: "Pending review",
        items: 1,
    },
];

export const orderTimeline: TimelineEvent[] = [
    {
        id: "evt-01",
        icon: "inventory_2",
        title: "Warehouse pull complete",
        description: "12 line items scanned and matched to order #2055",
        timestamp: "Today · 11:42 AM",
    },
    {
        id: "evt-02",
        icon: "local_shipping",
        title: "Courier pickup scheduled",
        description: "Order #2053 assigned to Metro Express",
        timestamp: "Today · 09:55 AM",
    },
    {
        id: "evt-03",
        icon: "support_agent",
        title: "Refund review requested",
        description: "Customer Sasha Kim shared supporting files",
        timestamp: "Yesterday · 07:18 PM",
    },
];
