import FAButton from "@/components/FAButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addItem, deleteItem, toggleItem } from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ShoppingItem } from "../types/shopping";

export default function Index() {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const items = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();

  const handleAdd = (): void => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter an item name.");
      return;
    }
    dispatch(addItem({ name, quantity }));
    setName("");
    setQuantity("");
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => dispatch(toggleItem(item.id))}
        accessibilityLabel={`Mark ${item.name} as purchased`}
      >
        <Text style={[styles.itemText, item.completed && styles.completed]}>
          {item.quantity}x {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(deleteItem(item.id))}>
        <Text style={styles.deleteBtn}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FAButton
        icon={<AntDesign name="plus" size={30} color="white" />}
        onClick={() => handleAdd}
      />
      <Text style={styles.header}>Shopping List</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Item..."
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Qty"
          style={[styles.input, { width: 70 }]}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No items yet!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#f0f2f5" },
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 25,
    color: "#1a1a1a",
    position: "relative",
  },
  inputGroup: { flexDirection: "row", gap: 10, marginBottom: 25 },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: { fontSize: 17, color: "#333" },
  completed: { textDecorationLine: "line-through", color: "#bbb" },
  deleteBtn: { color: "#FF3B30", fontWeight: "600" },
  emptyText: { textAlign: "center", color: "#999", marginTop: 50 },
});
