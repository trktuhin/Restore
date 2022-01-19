import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Product } from '../../app/models/Product';
import ProductList from './ProductList';

function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        agent.Catalog.list().then(prds => setProducts(prds))
            .catch(err => console.log(err)).finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message='Loading products ...' />
    return (
        <>
            <ProductList products={products} />
        </>
    );
}

export default Catalog;