import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetailPage from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/BasketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get().then(basket => dispatch(setBasket(basket)))
        .catch(err => console.log(err)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

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

  if (loading) return <LoadingComponent message="Initializing app ..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} onDarkModeChange={() => { setDarkMode(!darkMode) }} />
      <Container sx={{ marginTop: 12 }}>
        <Switch>
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
          <Route path='/server-error'>
            <ServerError />
          </Route>
          <Route path='/basket'>
            <BasketPage />
          </Route>
          <Route path='/checkout'>
            <CheckoutPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;

