import { useState, useEffect } from 'react';
import { Product } from '../../app/models/Product';
import ProductList from './ProductList';

function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('http://localhost:5268/api/products').then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <>
            <ProductList products={products} />
        </>
    );
}

export default Catalog;