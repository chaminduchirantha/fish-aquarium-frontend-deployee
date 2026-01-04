import Header from './components/Header'
import { lazy, Suspense, useState, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/authContext'
import Footer from './components/Footer'
import AlertPopups from './components/AlertsPopups'
import { CartProvider } from './context/cartContextFish'
import { CartProvider as CartProviderAccessories } from './context/cartContextAccessories'


const Welcome =  lazy(() => import('./pages/WelcomPage'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Service'))
const Access = lazy(() => import('./pages/Accessories'))
const Collection = lazy(() => import('./pages/Collection'))
const Feedback = lazy(() => import('./pages/FeedbackPage'))
const CustomizedAqua = lazy(() => import('./pages/CustomizeAquarium'))
const Fishes = lazy(() => import('./pages/Fishes'))
const Dilivery = lazy(() => import('./pages/DeliveryPage'))
const Payment = lazy(() => import('./pages/PaymentPage'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const CheckoutPage = lazy(() => import('./pages/OrderFishPage'))
const AccessoriesCheckoutPage = lazy(() => import('./pages/ordersAcceessories'))
const AdminDashBoard = lazy(()=>import('./pages/AdminDashBoard'))
const CustomerAdmin = lazy(() => import('./adminPages/CustomerAdmin'))
const FishesAdmin = lazy(() => import('./adminPages/FishesAdmin'))
const OrdersAdmin = lazy(() => import('./adminPages/FishOrdersAdmin'))
const OrdersAccessAdmin = lazy(() => import('./adminPages/AccessoriesOrdersAdmin'))
const AccessoriesAdmin = lazy(() => import('./adminPages/AccessoriesAdmin'))
const FeedbackAdmin = lazy(() => import('./adminPages/FeedbackAdmin'))
const PaymentAdmin = lazy(() => import('./adminPages/PaymentAdmin'))
const DeliveryAdmin = lazy(() => import('./adminPages/DiliveryAdmin'))
const CustomizedAquariumAdmin = lazy(() => import('./adminPages/CustomizedAquariumAdmin'))
const UserOrderPage = lazy(()=>import('./pages/ViewFishOrders'))
const UserOrderPageAccess = lazy(()=>import('./pages/ViewOrderAccessories'))



type RequireAuthTypes = { children: ReactNode; roles?: string[] };

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {

  if (!showPopup) setShowPopup(true);
    return (
      <>
        {showPopup && <AlertPopups/>}
      </>
    );
  }


  if (roles && !roles.some((r) => user.roles?.includes(r))) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation()

  const hideHeaderRoutes = ['/login', '/register', '/admin']
  const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route))

  const hideFooterRoutes = ['/my-orders', '/admin']
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route))

  return (
    <>
    
      {!shouldHideHeader && <Header />}
      
    
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/feedbacak"element={<Feedback />} />
          
          <Route path="/fish"element={<Fishes />}/>
          <Route path="/access"element={<Access />} /> 
          <Route
              path="/ordersFish"
              element={
                <RequireAuth roles={["USER"]}>
                  <CheckoutPage />
                </RequireAuth>
              } 
          /> 

          <Route
              path="/ordersAcceessories"
              element={
                <RequireAuth roles={["USER"]}>
                  <AccessoriesCheckoutPage />
                </RequireAuth>
              } 
          /> 

          <Route path="/collection" element={<Collection />} />
          <Route
            path="/customized"
            element={
              <RequireAuth roles={["USER"]}>
                <CustomizedAqua />
              </RequireAuth>
            }
          />

          <Route
            path="/dilivery"
            element={
              <RequireAuth roles={["USER"]}>
                <Dilivery />
              </RequireAuth>
            }
          />

          <Route path="/my-orders" element={<UserOrderPage />} />
          <Route path="/my-orders-access" element={<UserOrderPageAccess />} />

          <Route path="/payment"element={<Payment />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
              path="/admin"
              element={
                <RequireAuth roles={["ADMIN"]}>
                  <AdminDashBoard />
                </RequireAuth>
              }
            >
              <Route path="customers" element={<CustomerAdmin />} />
              <Route path="fishes" element={<FishesAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="ordersAccess" element={<OrdersAccessAdmin />} />
              <Route path="accessories" element={<AccessoriesAdmin />} />
              <Route path="feedback" element={<FeedbackAdmin/>} />
              <Route path="delivery" element={<DeliveryAdmin/>} />
              <Route path="payments" element={<PaymentAdmin/>} />
              <Route path="customized" element={<CustomizedAquariumAdmin/>} />
            </Route>
        </Routes>
      </Suspense>

      {!shouldHideFooter && <Footer />}

    </>
    
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartProviderAccessories>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProviderAccessories>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
