import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
interface Props {
    darkMode: boolean;
    onDarkModeChange: () => void;
}
const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
];

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
];

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    '&.active': { color: '#0febff' },
    '&:hover': { color: '#0ebfcc' }
};

function Header({ darkMode, onDarkModeChange }: Props) {
    const { basket } = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum += item.quantity, 0);
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        sx={{ color: 'inherit', textDecoration: 'none' }}
                        component={Link}
                        to='/'>
                        RoB-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={onDarkModeChange} />
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex' }}>
                    <IconButton component={Link} to="/basket" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;