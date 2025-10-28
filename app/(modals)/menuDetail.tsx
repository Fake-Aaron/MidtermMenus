import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const { name, category, description, price, image_url } = params;
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url as string }} style={styles.image} />
      <View style={styles.contentBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.descBox}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.price}>{Number(price).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const JASPER_ORANGE = "#D35400";

const styles = StyleSheet.create({
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
    resizeMode: "cover",
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
});