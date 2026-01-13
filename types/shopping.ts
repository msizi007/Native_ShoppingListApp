export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

export interface ShoppingState {
  items: ShoppingItem[];
}
