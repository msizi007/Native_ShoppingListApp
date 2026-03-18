import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  // Change state to string to match TextInput expectations
  const [quantity, setQuantity] = useState<string>("");

  const items = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();

  const handleAdd = (): void => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter an item name.");
      return;
    }

    // Convert string to number for the Redux action
    const qtyValue = quantity.trim() === "" ? 1 : parseInt(quantity, 10);

    dispatch(addItem({ name, quantity: qtyValue }));
    setName("");
    setQuantity("");
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.itemInfo}
        onPress={() => dispatch(toggleItem(item.id))}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        >
          {item.completed && <AntDesign name="check" size={14} color="white" />}
        </View>
        <Text style={[styles.itemText, item.completed && styles.completedText]}>
          <Text style={styles.qtyText}>{item.quantity}x</Text> {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(deleteItem(item.id))}>
        {/* Fixed icon name: closecircleo or closecircle are valid AntDesign names */}
        <AntDesign name="close-circle" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Item name..."
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Qty"
          style={styles.qtyInput}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="cart-variant"
                size={60}
                color="#ddd"
              />
            </View>
            <Text style={styles.emptyHeader}>Your list is empty</Text>
            <Text style={styles.emptySubtext}>
              Add items above to get started
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#000",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 25,
  },
  input: {
    flex: 3,
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 16,
  },
  qtyInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  itemInfo: { flex: 1, flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: { backgroundColor: "#000", borderColor: "#000" },
  itemText: { fontSize: 16, color: "#333" },
  qtyText: { fontWeight: "bold", color: "#666" },
  completedText: { textDecorationLine: "line-through", color: "#bbb" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  emptyHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});
