import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const JASPER_ORANGE = "#D35400";

interface ModalProps {
  showAddModal: boolean;
  showEditModal: boolean;
  showDeleteConfirm: boolean;
  newItem: { name: string; category: string; description: string; price: string };
  editFields: { name: string; category: string; description: string; price: string };
  setNewItem: (item: any) => void;
  setEditFields: (fields: any) => void;
  setShowAddModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowDeleteConfirm: (show: boolean) => void;
  confirmAdd: () => void;
  confirmEdit: () => void;
  confirmDelete: () => void;
  cancelEdit: () => void;
}

export function StaffPanelModals({
  showAddModal,
  showEditModal,
  showDeleteConfirm,
  newItem,
  editFields,
  setNewItem,
  setEditFields,
  setShowAddModal,
  setShowEditModal,
  setShowDeleteConfirm,
  confirmAdd,
  confirmEdit,
  confirmDelete,
  cancelEdit,
}: ModalProps) {
  return (
    <>
      {/* Add Modal */}
      <Modal visible={showAddModal} transparent animationType="fade" onRequestClose={() => setShowAddModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Menu Item</Text>

            <TextInput
              placeholder="Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Category"
              value={newItem.category}
              onChangeText={(text) => setNewItem({ ...newItem, category: text })}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Description"
              value={newItem.description}
              onChangeText={(text) => setNewItem({ ...newItem, description: text })}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={newItem.price}
              onChangeText={(text) => setNewItem({ ...newItem, price: text })}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <View style={styles.row}>
              <TouchableOpacity onPress={confirmAdd} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAddModal(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="fade" onRequestClose={cancelEdit}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Menu Item</Text>

            <TextInput
              placeholder="Name"
              value={editFields.name}
              onChangeText={(t) => setEditFields((s: any) => ({ ...s, name: t }))}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Category"
              value={editFields.category}
              onChangeText={(t) => setEditFields((s: any) => ({ ...s, category: t }))}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Description"
              value={editFields.description}
              onChangeText={(t) => setEditFields((s: any) => ({ ...s, description: t }))}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={editFields.price}
              onChangeText={(t) => setEditFields((s: any) => ({ ...s, price: t }))}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <View style={styles.row}>
              <TouchableOpacity onPress={confirmEdit} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEdit} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteConfirm} transparent animationType="fade" onRequestClose={() => setShowDeleteConfirm(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.confirmText}>
              Are you sure you want to delete this menu item?
            </Text>

            <View style={styles.row}>
              <TouchableOpacity onPress={confirmDelete} style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteConfirm(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: JASPER_ORANGE,
    marginBottom: 16,
    textAlign: "center",
  },
  confirmText: {
    color: "#111",
    marginBottom: 16,
    textAlign: "center"
  },
  input: {
    borderWidth: 2,
    borderColor: JASPER_ORANGE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#111",
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: JASPER_ORANGE,
    alignItems: "center",
    marginRight: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: JASPER_ORANGE,
    alignItems: "center",
    marginRight: 8,
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#000",
    fontWeight: "700",
  },
});