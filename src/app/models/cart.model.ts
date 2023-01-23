export interface Cart {
    items: Array<cartItem>;
};

export interface cartItem {   
    product: string;
    name: string;
    quantity: number;
    price: number;
    id: number;
}