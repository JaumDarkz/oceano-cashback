import { createContext, useEffect, useState } from 'react';

interface ICartContext {
    myProducts: any[];
    setProducts: (products: any[]) => void;
}

export const CartContext = createContext<ICartContext>({
    myProducts: [],
    setProducts: () => { }
});

export const CartProvider = ({ children }: any) => {
    const [myProducts, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const cart = localStorage.getItem('oceano-cart');
        if (cart) {
            setProducts(JSON.parse(cart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('oceano-cart', JSON.stringify(myProducts));       
    }, [myProducts]);

    return (
        <CartContext.Provider value={{ myProducts, setProducts }}>
            {children}
        </CartContext.Provider>
    );
}