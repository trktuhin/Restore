import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 350 }}>
            <Typography variant='h3' gutterBottom >Opps - we couldn't found what you are looking for.</Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
        </Container>
    );
}

export default NotFound;