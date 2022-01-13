import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
    darkMode: boolean;
    onDarkModeChange: () => void;
}
function Header({ darkMode, onDarkModeChange }: Props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    RoB-STORE
                </Typography>
                <Switch checked={darkMode} onChange={onDarkModeChange} />
            </Toolbar>
        </AppBar>
    );
}

export default Header;