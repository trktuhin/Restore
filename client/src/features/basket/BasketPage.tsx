import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import BasketSummary from './BasketSummary';

function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    useEffect(() => {
    }, [basket]);

    const handleAddItem = (productId: number, name: string) => {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (!basket || basket?.items.length === 0) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton loading={status.loading && status.name === `rem ${item.productId}`} onClick={() => handleRemoveItem(item.productId, 1, `rem ${item.productId}`)} color="error">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton loading={status.loading && status.name === `add ${item.productId}`} onClick={() => handleAddItem(item.productId, `add ${item.productId}`)} color="secondary">
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton loading={status.loading && status.name === `del ${item.productId}`} onClick={() => handleRemoveItem(item.productId, item.quantity, `del ${item.productId}`)} color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} >
                    <BasketSummary />
                    <Box p={3}>
                        <Button
                            component={Link}
                            to='/checkout'
                            variant='contained'
                            size='large'
                            fullWidth
                        >
                            Checkout
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>

    );
}

export default BasketPage;