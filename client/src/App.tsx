import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { ThemeProvider } from "@mui/material";
import CategoryRestaurants from './pages/CategoryRestaurants';
import RestaurantContent from './pages/RestaurantContent';
import { appTheme } from "./assets/theme";
import PrivateRoutes from './routes/PrivateRoutes';
import AuthRoutes from './routes/AuthRoutes';
import Vouchers from './pages/Vouchers';
import moment from 'moment';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import { LiveChatWidget } from '@livechat/widget-react'

function App() {
  moment.locale('en');

  return (
    <div className="root">
    <ThemeProvider theme={appTheme}>
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          {
            // TODO: Checkout must be a route that cannot be reachable if the basket is empty
          }
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/category/:id" element={<CategoryRestaurants />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantContent />} />
      </Routes>      
      <LiveChatWidget
      license="14536302"
      visibility="maximized"
    />
      <ToastContainer />
    </>
    </ThemeProvider>
    </div>
  );
}

export default App;
