import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  // Stores the information entered into the form
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  // Stores error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Stores all menu items
  const [menuItems, setMenuItems] = useState([]);

  // Course options
  const courses = [
    "Starter",
    "Main Course",
    "Dessert",
    "Drink",
  ];

  // Function used when the Save Menu Item button is pressed
  const saveItem = () => {
    // Remove old messages
    setError("");
    setSuccess("");

    // Check if any field is empty
    if (
      dishName.trim() === "" ||
      description.trim() === "" ||
      course === "" ||
      price.trim() === ""
    ) {
      setError("Please complete all the fields.");
      return;
    }

    // Convert the price to a number
    const priceNumber = parseFloat(price);

    // Check if the price is valid
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    // Create a new menu item
    const newItem = {
      id: Date.now().toString(),
      dishName: dishName,
      description: description,
      course: course,
      price: priceNumber.toFixed(2),
    };

    // Add the new item to the menu list
    setMenuItems([...menuItems, newItem]);

    // Show success message
    setSuccess("Menu item successfully added!");

    // Clear the form
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Application title */}
      <Text style={styles.title}>
        Christoffel's Menu Manager
      </Text>

      <Text style={styles.welcome}>
        Welcome, Chef
      </Text>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.heading}>
          Add Menu Item
        </Text>

        {/* Dish Name */}
        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={dishName}
          onChangeText={setDishName}
        />

        {/* Description */}
        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        {/* Course */}
        <Text style={styles.label}>
          Course
        </Text>

        <View style={styles.courseContainer}>
          {courses.map((item) => (
            <Pressable
              key={item}
              onPress={() => {
                setCourse(item);
                setError("");
                setSuccess("");
              }}
              style={[
                styles.courseButton,
                course === item &&
                  styles.selectedButton,
              ]}
            >
              <Text
                style={[
                  styles.courseText,
                  course === item &&
                    styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Price */}
        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: 120.00"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Error message */}
        {error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        {/* Success message */}
        {success !== "" && (
          <Text style={styles.success}>
            {success}
          </Text>
        )}

        {/* Save Button */}
        <Pressable
          style={styles.saveButton}
          onPress={saveItem}
        >
          <Text style={styles.saveText}>
            Save Menu Item
          </Text>
        </Pressable>
      </View>

      {/* Menu Items Heading */}
      <Text style={styles.menuHeading}>
        Menu Items
      </Text>

      {/* Message if no menu items exist */}
      {menuItems.length === 0 ? (
        <Text style={styles.emptyText}>
          No menu items have been added yet.
        </Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Dish Name */}
              <Text style={styles.itemName}>
                {item.dishName}
              </Text>

              {/* Course */}
              <Text style={styles.itemCourse}>
                Course: {item.course}
              </Text>

              {/* Description */}
              <Text style={styles.itemDescription}>
                {item.description}
              </Text>

              {/* Price */}
              <Text style={styles.itemPrice}>
                R{item.price}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  welcome: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  form: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },

  description: {
    height: 70,
    textAlignVertical: "top",
  },

  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  courseButton: {
    borderWidth: 1,
    borderColor: "#246BCE",
    borderRadius: 6,
    padding: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  selectedButton: {
    backgroundColor: "#246BCE",
  },

  courseText: {
    color: "#246BCE",
  },

  selectedText: {
    color: "white",
  },

  error: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  success: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#246BCE",
    padding: 13,
    borderRadius: 7,
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  menuHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#666666",
    marginTop: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  itemCourse: {
    color: "#555555",
    marginTop: 3,
  },

  itemDescription: {
    fontSize: 14,
    marginTop: 5,
  },

  itemPrice: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },
});
