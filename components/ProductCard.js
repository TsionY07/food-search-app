import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFav = favorites.find((f) => f.code === product.code);

  return (
    <View style={styles.card}>
      {product.image_url ? (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      ) : (
        <Text style={{ color: "#aaa" }}>📷 No Image</Text>
      )}
      <Text style={styles.title}>{product.product_name || "Unknown"}</Text>
      <Text style={styles.brand}>{product.brands || "No brand"}</Text>
      <Text style={styles.ingredients}>
        {product.ingredients_text
          ? product.ingredients_text.substring(0, 100) + "..."
          : "No ingredients listed"}
      </Text>
      <Button
        title={isFav ? "💔 Remove Favorite" : "💖 Add Favorite"}
        color={isFav ? "red" : "pink"}
        onPress={() =>
          isFav
            ? dispatch(removeFavorite(product.code))
            : dispatch(addFavorite(product))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "#fff0f6",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#ff66b2",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#ff3399", marginBottom: 5 },
  brand: { fontSize: 14, color: "#cc6699", marginBottom: 10 },
  ingredients: { fontSize: 12, color: "#666", marginBottom: 10 },
});
