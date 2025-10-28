import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { StaffPanelModals } from "../(modals)/staffPanelModals";
import { useMenuStore } from "../../lib/menuStore";
import { supabase } from "../../lib/supabase";

const JASPER_ORANGE = "#D35400";

export default function StaffPanelScreen() {
  const { menu, fetchMenu, addMenuItem, updateMenuItem, deleteMenuItem } =
    useMenuStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // editing state (used by edit modal)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFields, setEditFields] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    // check current session
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setIsAuthenticated(!!data?.session);
      if (data?.session) {
        fetchMenu();
      }
    });

    // listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchMenu();
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // open modal instead of immediately submitting
  const handleAdd = () => {
    setShowAddModal(true);
  };

  // confirm and submit from add modal
  const confirmAdd = async () => {
    if (!newItem.name || !newItem.price) return;
    await addMenuItem({
      name: newItem.name,
      category: newItem.category,
      description: newItem.description,
      price: parseFloat(newItem.price),
    });
    setNewItem({ name: "", category: "", description: "", price: "" });
    setShowAddModal(false);
  };

  // open edit modal for item
  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setEditFields({
      name: item.name ?? "",
      category: item.category ?? "",
      description: item.description ?? "",
      price: String(item.price ?? ""),
    });
    setShowEditModal(true);
  };

  // confirm edit from modal
  const confirmEdit = async () => {
    if (editingId === null) return;
    await updateMenuItem(editingId, {
      name: editFields.name,
      category: editFields.category,
      description: editFields.description,
      price: parseFloat(editFields.price || "0"),
    });
    setEditingId(null);
    setEditFields({ name: "", category: "", description: "", price: "" });
    setShowEditModal(false);
  };

  // prompt delete confirmation
  const promptDelete = (id: number) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteTargetId === null) return;
    await deleteMenuItem(deleteTargetId);
    setDeleteTargetId(null);
    setShowDeleteConfirm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFields({ name: "", category: "", description: "", price: "" });
    setShowEditModal(false);
  };

  // Show message if not authenticated
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Access Restricted</Text>
          <Text style={styles.messageText}>
            Please log in through the Staff Login tab to access the staff panel.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Panel</Text>

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <StaffPanelModals
        showAddModal={showAddModal}
        showEditModal={showEditModal}
        showDeleteConfirm={showDeleteConfirm}
        newItem={newItem}
        editFields={editFields}
        setNewItem={setNewItem}
        setEditFields={setEditFields}
        setShowAddModal={setShowAddModal}
        setShowEditModal={setShowEditModal}
        setShowDeleteConfirm={setShowDeleteConfirm}
        confirmAdd={confirmAdd}
        confirmEdit={confirmEdit}
        confirmDelete={confirmDelete}
        cancelEdit={cancelEdit}
      />

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <View style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>
                    {item.name}{" "}
                    <Text style={styles.itemPrice}>— {Number(item.price).toFixed(2)}</Text>
                  </Text>
                  {item.category ? <Text style={styles.itemCategory}>{item.category}</Text> : null}
                  {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => promptDelete(item.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: JASPER_ORANGE },
  input: {
    borderWidth: 2,
    borderColor: JASPER_ORANGE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#111",
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    color: "#111",
  },
  addButton: {
    backgroundColor: JASPER_ORANGE,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 18,
  },
  addButtonText: { color: "#fff", fontWeight: "700" },

  itemWrapper: { paddingHorizontal: 0, marginBottom: 12 },
  itemCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: JASPER_ORANGE,
    backgroundColor: "#fff",
  },
  itemRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemInfo: { flex: 1, paddingRight: 8 },
  itemTitle: { fontSize: 16, fontWeight: "700", color: "#111" },
  itemPrice: { color: JASPER_ORANGE, fontWeight: "800" },
  itemCategory: { fontSize: 13, color: "#444", marginTop: 4 },
  itemDesc: { fontSize: 13, color: "#333", marginTop: 6 },

  actions: { flexDirection: "row", alignItems: "center" },
  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: JASPER_ORANGE,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  editBtnText: { color: JASPER_ORANGE, fontWeight: "700" },

  deleteBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  deleteBtnText: { color: "#000", fontWeight: "700" },

  // edit/save/cancel styles
  saveBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: JASPER_ORANGE,
    alignItems: "center",
    marginRight: 8,
  },
  saveBtnText: { color: "#fff", fontWeight: "700" },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
  cancelBtnText: { color: "#000", fontWeight: "700" },

  separator: {
    height: 4,
    backgroundColor: "#000",
    marginTop: 12,
    borderRadius: 2,
  },

  row: { flexDirection: "row", marginTop: 6 },

  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: JASPER_ORANGE,
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});
