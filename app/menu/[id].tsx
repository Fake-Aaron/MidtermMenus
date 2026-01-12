import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      const { data, error } = await supabase
        .from('Menu')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Failed to fetch menu item:', error);
      } else {
        setItem(data);
      }

      setLoading(false);
    };

    fetchItem();
  }, [id]);
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Menu item not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
       onPress={() => router.back()}
       style={styles.backButton}
      >
      <Text style={styles.backText}>← Back</Text>
      </Pressable>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.contentBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.descBox}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text style={styles.price}>{item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const JASPER_ORANGE = "#D35400";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: JASPER_ORANGE,
    resizeMode: "contain",
    marginBottom: 16,
  },
  contentBox: {
    borderWidth: 2,
    borderColor: JASPER_ORANGE, 
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  descBox: {
    borderLeftWidth: 4,
    borderLeftColor: `${JASPER_ORANGE}99`,
    paddingLeft: 10,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: JASPER_ORANGE,
    textAlign: "right",
  },
  backButton: {
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 10,
  backgroundColor: JASPER_ORANGE,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: JASPER_ORANGE,
  elevation: 3,
},

backText: {
  fontSize: 14,
  fontWeight: "600",
},
});