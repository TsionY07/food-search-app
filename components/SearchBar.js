import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🍓 Enter barcode "
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    borderWidth: 2,
    borderColor: "#ff99cc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ffe6f0",
    fontSize: 16,
  },
});
