import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import Catalog from "../../features/catalog/catalog";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} onDarkModeChange={() => { setDarkMode(!darkMode) }} />
      <Container sx={{ marginTop: 12 }}>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;

