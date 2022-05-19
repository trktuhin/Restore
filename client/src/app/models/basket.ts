export interface BasketItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    brand: string;
    type: string;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
}
