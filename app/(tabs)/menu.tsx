import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OrderModal } from '../(modals)/orderModal';
import { getMenus } from "../../lib/api";
import { supabase } from '../../lib/supabase';

const JASPER_ORANGE = "#D35400";

export default function MenuScreen() {
  const [menus, setMenus] = useState<any[]>([]);
  const [sortType, setSortType] = useState<"alphabet" | "category">("alphabet");
  const [orders, setOrders] = useState<any[]>([]);
  const [showOrders, setShowOrders] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<string[]>([]);
  const handleDeleteItem = (index: number) => {
  setPendingOrders((prev) => prev.filter((_, i) => i !== index));
  };


  // Fetch menus and orders from Supabase
  useEffect(() => {
    fetchMenus();
    fetchOrders();
  }, []);

  async function fetchMenus() {
    const data = await getMenus();
    // log the full fetched payload to inspect returned image paths/URLs
    console.log("Fetched menus:", JSON.stringify(data, null, 2));
    setMenus(data);
  }

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('OrderForm')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1); 
    
    if (data && !error && data.length > 0) {
      // Convert the row's orders into an array of orders
      const orderArray = [];
      for (let i = 1; i <= 5; i++) {
        if (data[0][`Order${i}`]) {
          orderArray.push({
            id: i,
            name: data[0][`Order${i}`],
            created_at: data[0].created_at
          });
        }
      }
      setOrders(orderArray);
    }
  }

  function sortMenus(data: any[]) {
    if (sortType === "alphabet") {
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "category") {
      return [...data].sort((a, b) => a.category.localeCompare(b.category));
    }
    return data;
  }

  const sortedMenus = sortMenus(menus);

  // Add order handler
  async function handleOrder(item: any) {
    if (pendingOrders.length >= 5) {
      Alert.alert('Order Limit Reached', 'Please submit current orders first');
      return;
    }
    
    setPendingOrders(current => [...current, item.name]);
    Alert.alert('Added to Order', `${item.name} has been added to your order`);
  }

  // New function to handle order submission
  async function submitOrders(phoneNumber: string) {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }

    const orderData = {
      PhoneNumber: phoneNumber,
      ...pendingOrders.reduce((acc, order, index) => ({
        ...acc,
        [`Order${index + 1}`]: order
      }), {})
    };

    const { error } = await supabase
      .from('OrderForm')
      .insert([orderData]);

    if (!error) {
      setPendingOrders([]); // Clear pending orders
      fetchOrders();
      Alert.alert('Success', 'Orders submitted successfully!');
    } else {
      Alert.alert('Error', 'Failed to submit orders. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo and Welcome Section */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../assets/images/VBLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcome}>Welcome to Vietnam Bistro</Text>
      </View>

      <Text style={styles.title}>Our Menu</Text>
      
      {/* Sorting and Orders buttons */}
      <View style={styles.headerButtons}>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortButton, sortType === "alphabet" && styles.activeSort]}
            onPress={() => setSortType("alphabet")}
          >
            <Text style={styles.sortText}>Sort by A–Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortType === "category" && styles.activeSort]}
            onPress={() => setSortType("category")}
          >
            <Text style={styles.sortText}>Sort by Category</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => setShowOrders(true)}
        >
          <Text style={styles.ordersButtonText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      <OrderModal
        visible={showOrders}
        onClose={() => setShowOrders(false)}
        pendingOrders={pendingOrders}
        onSubmit={submitOrders}
        onDeleteItem={handleDeleteItem}
      />

      {/* Menu List */}
      <FlatList
        data={sortedMenus}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrapper}>
              <Pressable
                android_ripple={{ color: `${JASPER_ORANGE}33` }}
                style={styles.item}
                onPress={() => router.push({ 
                  pathname: "/menu/[id]",  
                  params: item 
                })}
              >
                <View style={styles.itemContent}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.textContent}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.price}>{item.price.toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => handleOrder(item)}
                  >
                    <Text style={styles.orderButtonText}>Order</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
              <View style={styles.separator} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  sortContainer: { flexDirection: "row", marginBottom: 12 },
  sortButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
  },
  activeSort: {
    backgroundColor: JASPER_ORANGE,
    borderColor: JASPER_ORANGE,
  },
  sortText: { color: "#000", fontWeight: "600" },
  itemWrapper: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  item: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: JASPER_ORANGE, // orange border around each item
    backgroundColor: "#fff",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#f2f2f2",
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: JASPER_ORANGE, 
  },
  separator: {
    height: 4,             
    backgroundColor: "#000",
    marginTop: 12,
    borderRadius: 2,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: JASPER_ORANGE,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    color: JASPER_ORANGE,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  ordersButton: {
    padding: 8,
    backgroundColor: JASPER_ORANGE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  ordersButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  orderButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: JASPER_ORANGE,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
});
