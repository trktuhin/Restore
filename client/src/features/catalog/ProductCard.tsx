import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/BasketSlice";
interface Prop {
    product: Product
}

function ProductCard({ product }: Prop) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ backgroundColor: "secondary.main" }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                component="img"
                image={product.pictureUrl}
                alt={product.name}
                sx={{ height: 140, width: "auto", backgroundColor: "primary.light", margin: "0 auto" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}/{product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status === `pendingAddItem${product.id}`} onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))} size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;