
export type ProductCategory = {
    id: number;
    name: string;
    unite: string;
    treshold: number;
}

export type Product = {
    id: number;
    quantity: number;
    price: number;
    category: number
    buyer: number;
};

export type ProductDTO = {
    quantity: number;
    price: number;
    category: number;
    buyer: number;
}