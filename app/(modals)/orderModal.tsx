import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const JASPER_ORANGE = "#D35400";

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  pendingOrders: string[];
  onSubmit: (phoneNumber: string) => Promise<void>;
}

export function OrderModal({ visible, onClose, pendingOrders, onSubmit }: OrderModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (pendingOrders.length === 0) {
      Alert.alert('No Orders', 'Please add items to your order first');
      return;
    }
    onSubmit(phoneNumber);
    setPhoneNumber(''); // Clear phone number after submit
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Current Order</Text>
          
          <FlatList
            data={pendingOrders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.orderItem}>
                <Text style={styles.orderNum}>Item #{index + 1}</Text>
                <Text style={styles.orderName}>{item}</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No items in order</Text>
            )}
          />

          {pendingOrders.length > 0 && (
            <View style={styles.submitSection}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
              />
              <TouchableOpacity 
                style={styles.submitBtn}
                onPress={handleSubmit}
              >
                <Text style={styles.submitBtnText}>Submit Order</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    borderColor: JASPER_ORANGE,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: JASPER_ORANGE,
    marginBottom: 16,
    textAlign: "center",
  },
  orderItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderNum: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  orderTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    padding: 20,
  },
  closeBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: JASPER_ORANGE,
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  submitSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  phoneInput: {
    borderWidth: 2,
    borderColor: JASPER_ORANGE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: JASPER_ORANGE,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});