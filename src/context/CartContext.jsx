import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ff_cart_v1";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: Math.min(i.qty + action.item.qty, i.stock) }
            : i,
        );
      }
      return [...state, action.item];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      return state
        .map((i) =>
          i.id === action.id
            ? { ...i, qty: Math.max(0, Math.min(action.qty, i.stock)) }
            : i,
        )
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem: (product, qty = 1) =>
        dispatch({
          type: "ADD",
          item: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.offerPrice ?? product.price,
            unit: product.unit,
            image: product.image,
            stock: product.stock,
            qty,
          },
        }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
