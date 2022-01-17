import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetailPage from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
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
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/catalog' exact>
          <Catalog />
        </Route>
        <Route path='/catalog/:id'>
          <ProductDetailPage />
        </Route>
        <Route path='/about' >
          <AboutPage />
        </Route>
        <Route path='/contact'>
          <ContactPage />
        </Route>
      </Container>
    </ThemeProvider>
  );
}

export default App;

