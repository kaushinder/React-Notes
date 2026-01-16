import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(), // ✅ Persisted state
  },
  reducers: {
    addItem: (state, action) => {
      // mutating the state object directly because
      // immer library is used internally by redux toolkit
      state.items.push(action.payload);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state) => {
      state.items.pop();

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];

      // Clear localStorage
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
