import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useProducts(params) {
  const key = JSON.stringify(params);
  const [state, setState] = useState({
    items: [],
    total: 0,
    totalPages: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    getProducts(JSON.parse(key))
      .then((res) => {
        if (!cancelled)
          setState({
            items: res.items,
            total: res.total,
            totalPages: res.totalPages,
            loading: false,
            error: null,
          });
      })
      .catch((err) => {
        if (!cancelled)
          setState((s) => ({ ...s, loading: false, error: err.message }));
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return state;
}
