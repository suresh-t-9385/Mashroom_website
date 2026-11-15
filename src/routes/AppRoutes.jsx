import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Spinner from "../components/common/Spinner";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Varieties = lazy(() => import("../pages/Varieties"));
const Benefits = lazy(() => import("../pages/Benefits"));
const FarmingProcess = lazy(() => import("../pages/FarmingProcess"));
const Blog = lazy(() => import("../pages/Blog"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Contact = lazy(() => import("../pages/Contact"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderConfirmation = lazy(() => import("../pages/OrderConfirmation"));
const OrderTracking = lazy(() => import("../pages/OrderTracking"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const LegalPage = lazy(() => import("../pages/LegalPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../admin/Dashboard"));
const ProductsAdmin = lazy(() => import("../admin/ProductsAdmin"));
const InventoryAdmin = lazy(() => import("../admin/InventoryAdmin"));
const OrdersAdmin = lazy(() => import("../admin/OrdersAdmin"));
const CustomersAdmin = lazy(() => import("../admin/CustomersAdmin"));
const SettingsAdmin = lazy(() => import("../admin/SettingsAdmin"));

const privacySections = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect your name, email, phone number and delivery address when you place an order or subscribe to our newsletter.",
    ],
  },
  {
    heading: "How we use your data",
    paragraphs: [
      "Your data is used to fulfil orders, provide customer support and send order updates. We do not sell personal data.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use strictly necessary cookies for cart persistence and session management, plus optional analytics cookies.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal data by writing to hello@fungifresh.example.com.",
    ],
  },
];

const termsSections = [
  {
    heading: "Orders and acceptance",
    paragraphs: [
      "All orders are subject to availability. We confirm acceptance when the order is dispatched.",
    ],
  },
  {
    heading: "Pricing",
    paragraphs: [
      "Prices are listed in INR and include applicable taxes unless stated otherwise. Delivery charges are shown at checkout.",
    ],
  },
  {
    heading: "Delivery",
    paragraphs: [
      "We dispatch perishable items within 24 hours. Delivery timelines vary by pin code and are estimates, not guarantees.",
    ],
  },
  {
    heading: "Returns and refunds",
    paragraphs: [
      "Because mushrooms are perishable, we accept quality complaints raised within 12 hours of delivery. We will replace or refund at our discretion.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India and subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.",
    ],
  },
];

export default function AppRoutes() {
  return (
    <Suspense fallback={<Spinner fullPage label="Loading page…" />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/farming-process" element={<FarmingProcess />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/privacy-policy"
            element={
              <LegalPage
                title="Privacy Policy"
                description="How FungiFresh Organics collects, uses and protects your personal data."
                path="/privacy-policy"
                updated="1 March 2026"
                sections={privacySections}
              />
            }
          />
          <Route
            path="/terms"
            element={
              <LegalPage
                title="Terms & Conditions"
                description="Terms governing the purchase of mushrooms and use of the FungiFresh website."
                path="/terms"
                updated="1 March 2026"
                sections={termsSections}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="inventory" element={<InventoryAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="customers" element={<CustomersAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
