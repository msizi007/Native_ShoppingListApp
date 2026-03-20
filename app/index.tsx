import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Added updateItem to imports
import {
  addItem,
  deleteItem,
  editItem,
  toggleItem,
} from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ShoppingItem } from "../types/shopping";

export default function Index() {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  // Modal & Edit States
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const items = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();

  const handleAdd = (): void => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter an item name.");
      return;
    }
    const qtyValue = quantity.trim() === "" ? 1 : parseInt(quantity, 10);
    dispatch(addItem({ name, quantity: qtyValue }));
    setName("");
    setQuantity("");
  };

  const openEditModal = (item: ShoppingItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditQuantity(item.quantity.toString());
    setIsEditModalVisible(true);
  };

  const handleUpdate = () => {
    if (editingItem && editName.trim()) {
      dispatch(
        editItem({
          ...editingItem,
          name: editName,
          quantity: parseInt(editQuantity, 10) || 1,
        }),
      );
      setIsEditModalVisible(false);
      setEditingItem(null);
    }
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

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => openEditModal(item)}
          style={styles.iconButton}
        >
          <AntDesign name="edit" size={22} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(deleteItem(item.id))}>
          <AntDesign name="close-circle" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      {/* Input Section */}
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

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Item</Text>

            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Item name"
            />

            <TextInput
              style={styles.modalInput}
              value={editQuantity}
              onChangeText={setEditQuantity}
              keyboardType="numeric"
              placeholder="Quantity"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleUpdate}
              >
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  header: { fontSize: 28, fontWeight: "800", marginBottom: 20, color: "#000" },
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  itemInfo: { flex: 1, flexDirection: "row", alignItems: "center" },
  actionButtons: { flexDirection: "row", alignItems: "center", gap: 15 },
  iconButton: { padding: 4 },
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
    marginTop: 50,
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
  emptySubtext: { fontSize: 14, color: "#999" },

  // New Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  modalHeader: { fontSize: 20, fontWeight: "800", marginBottom: 20 },
  modalInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 15,
    fontSize: 16,
  },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 10 },
  modalBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: { backgroundColor: "#f5f5f5" },
  saveBtn: { backgroundColor: "#000" },
  cancelBtnText: { color: "#666", fontWeight: "600" },
  saveBtnText: { color: "#fff", fontWeight: "600" },
});
