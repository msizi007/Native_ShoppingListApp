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
import {
  addItem,
  deleteItem,
  editItem,
  toggleItem,
} from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ShoppingItem } from "../types/shopping";

export default function Index() {
  // Input States
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  // Edit Modal States
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  // Delete Confirmation States
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const items = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();

  /** --- Handlers --- */
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
    }
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
    setIsDeleteAlertVisible(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete));
      setIsDeleteAlertVisible(false);
      setItemToDelete(null);
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

        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
          <AntDesign name="close-circle" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      {/* Main Input Group */}
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
          </View>
        }
      />

      {/* EDIT MODAL */}
      <Modal visible={isEditModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Item</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.modalInput}
              value={editQuantity}
              onChangeText={setEditQuantity}
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleUpdate}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* DELETE CONFIRMATION MODAL (CUSTOM ALERT) */}
      <Modal visible={isDeleteAlertVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertContent}>
            <AntDesign
              name="warning"
              size={40}
              color="#FF3B30"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalHeader}>Are you sure?</Text>
            <Text style={styles.alertSubtext}>
              Do you really want to delete this item? This cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsDeleteAlertVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.deleteBtn]}
                onPress={handleDelete}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  qtyInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#eee",
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
  actionButtons: { flexDirection: "row", alignItems: "center", gap: 12 },
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
  emptyHeader: { fontSize: 18, fontWeight: "700", color: "#333" },

  // Modal & Alert Styles
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
  },
  alertContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalHeader: { fontSize: 20, fontWeight: "800", marginBottom: 10 },
  alertSubtext: { textAlign: "center", color: "#666", marginBottom: 20 },
  modalInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  modalActions: { flexDirection: "row", gap: 10, width: "100%" },
  modalBtn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: { backgroundColor: "#eee" },
  saveBtn: { backgroundColor: "#007AFF" },
  deleteBtn: { backgroundColor: "#FF3B30" }, // The "btn-danger" equivalent
});
