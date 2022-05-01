import { Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Prop {
    products: Product[];
}

function ProductList({ products }: Prop) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4}>
            {products?.map(item => (
                <Grid key={item.id} item xs={4}>
                    {
                        !productsLoaded ? (
                            <ProductCardSkeleton />
                        ) : (
                            <ProductCard product={item} />
                        )
                    }
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;