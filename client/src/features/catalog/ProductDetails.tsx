import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Product } from '../../app/models/Product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from '../basket/BasketSlice';
import { fetchSingleProductAsync, productSelectors } from './catalogSlice';

function ProductDetailPage() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id));
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(x => x.productId === +id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchSingleProductAsync(parseInt(id)));
    }, [id, item, product, dispatch]);

    const handleInputChange = (event: any) => {
        if (event.target.value < 0) return;
        setQuantity(event.target.value);
    }

    const handleUpdateCart = () => {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product ...' />
    if (!product) return <NotFound />
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product?.pictureUrl} alt={product?.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product?.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                {product && <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>}
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product?.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Qunatity in stock'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            onClick={handleUpdateCart}
                            loading={status.includes('pending')}
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add To Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductDetailPage;