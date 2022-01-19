import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

function ServerError() {
    const history = useHistory();
    const { state } = useLocation<any>();
    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h3' color="error" gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
                </>

            ) : (
                <Typography variant='h3' gutterBottom>Server Error</Typography>
            )}
            <Button onClick={() => history.push('/catalog')}>Go back to Store</Button>
        </Container>
    );
}

export default ServerError;