import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  if (!favorites.length) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>💌 No favorites yet!</Text>;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
}
