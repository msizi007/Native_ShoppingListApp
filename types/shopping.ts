export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

export interface ShoppingItemPayload {
  name: string;
  quantity: number;
}

export interface ShoppingState {
  items: ShoppingItem[];
}
