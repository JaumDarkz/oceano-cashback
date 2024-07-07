import { createContext, useEffect, useState } from 'react';
import { fullTextSearch, getAllProducts } from '@/services/api';

interface IProductsContext {
    products: any[];
    setProducts: (products: any[]) => void;
    all() : any;
    query(query: string) : any;
}

export const ProductsContext = createContext<IProductsContext>({
    products: [],
    setProducts: () => { },
    all: () => {},
    query: () => {}    
});

export const ProductsProvider = ({ children }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);

        if (process.env.API_URL === undefined) return

        getAllProducts(process.env.API_URL).then((response) => {
            const formatedProducts = response.data.map((product: any) => {
                return {
                    id: product.id,
                    image: product.image,
                    productName: product.name,
                    value: product.price / 100,
                    discountValue: product.price,
                    description: product.description,
                    starsValue: 5,
                    componentType: "coupon",
                    minimumOrder: product.price
                }
            });
            setProducts(formatedProducts);
        });

        setLoading(false);
    };

    const all = async () => {
        setLoading(true);
        if (process.env.API_URL === undefined) return
        await getAllProducts(process.env.API_URL).then((response) => {
            const formatedProducts = response.data.map((product: any) => {
                return {
                    id: product.id,
                    image: product.image,
                    productName: product.name,
                    value: product.price / 100,
                    discountValue: product.price,
                    description: product.description,
                    starsValue: 5,
                    componentType: "coupon",
                    minimumOrder: product.price
                }
            });
            setProducts(formatedProducts);
        }).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    const query = async (query: string) => {
        setLoading(true);
        if (process.env.API_URL === undefined) return
        await fullTextSearch(process.env.API_URL, query).then((response) => {
            const formatedProducts = response?.data.map((product: any) => {
                return {
                    id: product.id,
                    image: product.image,
                    productName: product.name,
                    value: product.price / 100,
                    discountValue: product.price,
                    description: product.description,
                    starsValue: 5,
                    componentType: "coupon",
                    minimumOrder: product.price
                }
            });
            setProducts(formatedProducts);
        }).catch(
            (error) => {
                console.log(error);
            }
        );
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts, all, query }}>
            {children}
        </ProductsContext.Provider>
    );
}