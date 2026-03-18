import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ShoppingItem,
  ShoppingItemPayload,
  ShoppingState,
} from "../types/shopping";

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItemPayload>) => {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: action.payload.name,
        quantity: action.payload.quantity || 0,
        completed: false,
      };
      state.items.push(newItem);
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    editItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addItem, toggleItem, deleteItem, editItem } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
