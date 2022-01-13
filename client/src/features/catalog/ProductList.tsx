import { Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";

interface Prop {
    products: Product[];
}

function ProductList({ products }: Prop) {
    return (
        <Grid container spacing={4}>
            {products?.map(item => (
                <Grid key={item.id} item xs={3}>
                    <ProductCard product={item} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;