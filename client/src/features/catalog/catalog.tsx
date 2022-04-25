import { useEffect } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';

function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductAsync())
    }, [productsLoaded, dispatch]);

    if (status.includes('pending')) return <LoadingComponent message='Loading products ...' />
    return (
        <>
            <ProductList products={products} />
        </>
    );
}

export default Catalog;