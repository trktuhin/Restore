import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';

function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const [timer, setTimer] = useState<any>(null);

    const debounceSearch = (event: any) => {
        if (timer) {
            clearTimeout(timer);
        }
        const tempTimer = setTimeout(() => {
            dispatch(setProductParams({ searchTerm: event.target.value }));
        }, 1000);
        setTimer(tempTimer);
    };

    return (
        <TextField
            label="Search Products"
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debounceSearch(event);
            }}
        />
    );
}

export default ProductSearch;