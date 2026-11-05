
import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {

  // Form information
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  // Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Stores all menu items
  const [menuItems, setMenuItems] = useState([]);

  // Stores the ID of the item being edited
  const [editingId, setEditingId] = useState(null);

  // Search and filter information
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Available courses
  const courses = [
    "Starter",
    "Main Course",
    "Dessert",
    "Drink",
  ];

  // Function to clear the form
  const clearForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setEditingId(null);
    setError("");
  };

  // Add a new item or update an existing item
  const saveItem = () => {

    setError("");
    setSuccess("");

    // Check that all fields are completed
    if (
      dishName.trim() === "" ||
      description.trim() === "" ||
      course === "" ||
      price.trim() === ""
    ) {
      setError("Please complete all the fields.");
      return;
    }

    // Convert price into a number
    const priceNumber = parseFloat(price);

    // Check that the price is valid
    if (!isFinite(priceNumber) || priceNumber <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    // Create the menu item information
    const itemDetails = {
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: priceNumber.toFixed(2),
    };

    if (editingId !== null) {

      // Update the selected menu item
      setMenuItems((previousItems) =>
        previousItems.map((item) =>
          item.id === editingId
            ? { ...item, ...itemDetails }
            : item
        )
      );

      setSuccess("Menu item successfully updated!");

    } else {

      // Create a new menu item
      const newItem = {
        id: Date.now().toString(),
        ...itemDetails,
      };

      // Add the new item to the list
      setMenuItems((previousItems) => [
        ...previousItems,
        newItem,
      ]);

      setSuccess("Menu item successfully added!");
    }

    // Clear the form after saving
    clearForm();
  };

  // Function to load an item into the form for editing
  const editItem = (item) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);
    setError("");
    setSuccess("");

    // Move the user back to the form
    setSearchText("");
    setSelectedFilter("All");
  };

  // Function to delete a menu item
  const deleteItem = (id) => {

    Alert.alert(
      "Delete Menu Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMenuItems((previousItems) =>
              previousItems.filter((item) => item.id !== id)
            );

            // Cancel editing if this item was being edited
            if (editingId === id) {
              clearForm();
            }

            setSuccess("Menu item successfully deleted!");
            setError("");
          },
        },
      ]
    );
  };

  // Filter menu items using the search and course selection
  const filteredItems = menuItems.filter((item) => {

    const matchesSearch = item.dishName
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedFilter === "All" ||
      item.course === selectedFilter;

    return matchesSearch && matchesCourse;
  });

  // Clear the search and course filter
  const clearFilters = () => {
    setSearchText("");
    setSelectedFilter("All");
  };

  // Calculate menu statistics
  const totalItems = menuItems.length;

  const totalPrice = menuItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const averagePrice =
    totalItems > 0 ? totalPrice / totalItems : 0;

  // Count items in each course
  const starterCount = menuItems.filter(
    (item) => item.course === "Starter"
  ).length;

  const mainCount = menuItems.filter(
    (item) => item.course === "Main Course"
  ).length;

  const dessertCount = menuItems.filter(
    (item) => item.course === "Dessert"
  ).length;

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Application title */}
        <Text style={styles.title}>
          Christoffel's Menu Manager
        </Text>

        <Text style={styles.welcome}>
          Welcome, Chef
        </Text>

        {/* ADD AND EDIT MENU ITEMS */}
        <View style={styles.form}>

          <Text style={styles.heading}>
            {editingId !== null
              ? "Edit Menu Item"
              : "Add Menu Item"}
          </Text>

          <Text style={styles.label}>Dish Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[styles.input, styles.description]}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Course</Text>

          <View style={styles.courseContainer}>
            {courses.map((item) => (
              <Pressable
                key={item}
                onPress={() => setCourse(item)}
                style={[
                  styles.courseButton,
                  course === item && styles.selectedButton,
                ]}
              >
                <Text
                  style={[
                    styles.courseText,
                    course === item && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Price (R)</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 120.00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          {/* Error and success messages */}
          {error !== "" && (
            <Text style={styles.error}>{error}</Text>
          )}

          {success !== "" && (
            <Text style={styles.success}>{success}</Text>
          )}

          {/* Save or update button */}
          <Pressable
            style={styles.saveButton}
            onPress={saveItem}
          >
            <Text style={styles.saveText}>
              {editingId !== null
                ? "Update Menu Item"
                : "Save Menu Item"}
            </Text>
          </Pressable>

          {/* Cancel editing */}
          {editingId !== null && (
            <Pressable
              style={styles.cancelButton}
              onPress={clearForm}
            >
              <Text style={styles.cancelText}>
                Cancel Editing
              </Text>
            </Pressable>
          )}

        </View>

        {/* MENU STATISTICS */}
        <Text style={styles.sectionHeading}>
          Menu Statistics
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {totalItems}
            </Text>
            <Text style={styles.statLabel}>
              Total Items
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              R{averagePrice.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>
              Average Price
            </Text>
          </View>

        </View>

        <View style={styles.courseStats}>

          <View style={styles.courseStatCard}>
            <Text style={styles.courseStatNumber}>
              {starterCount}
            </Text>
            <Text style={styles.statLabel}>Starters</Text>
          </View>

          <View style={styles.courseStatCard}>
            <Text style={styles.courseStatNumber}>
              {mainCount}
            </Text>
            <Text style={styles.statLabel}>Main Courses</Text>
          </View>

          <View style={styles.courseStatCard}>
            <Text style={styles.courseStatNumber}>
              {dessertCount}
            </Text>
            <Text style={styles.statLabel}>Desserts</Text>
          </View>

        </View>

        {/* SEARCH AND FILTER */}
        <Text style={styles.sectionHeading}>
          Search and Filter Menu
        </Text>

        <View style={styles.searchContainer}>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for a dish..."
            value={searchText}
            onChangeText={setSearchText}
          />

          <Text style={styles.label}>
            Filter by Course
          </Text>

          <View style={styles.courseContainer}>

            {["All", "Starter", "Main Course", "Dessert", "Drink"].map(
              (item) => (
                <Pressable
                  key={item}
                  onPress={() => setSelectedFilter(item)}
                  style={[
                    styles.courseButton,
                    selectedFilter === item &&
                      styles.selectedButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.courseText,
                      selectedFilter === item &&
                        styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )
            )}

          </View>

          {/* Clear search and filter */}
          <Pressable
            style={styles.clearButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearText}>
              Clear Search and Filters
            </Text>
          </Pressable>

        </View>

        {/* MENU ITEMS */}
        <Text style={styles.sectionHeading}>
          Menu Items ({filteredItems.length})
        </Text>

        {filteredItems.length === 0 ? (

          <Text style={styles.emptyText}>
            {menuItems.length === 0
              ? "No menu items have been added yet."
              : "No matching menu items found."}
          </Text>

        ) : (

          filteredItems.map((item) => (

            <View style={styles.card} key={item.id}>

              <Text style={styles.itemName}>
                {item.dishName}
              </Text>

              <Text style={styles.itemCourse}>
                Course: {item.course}
              </Text>

              <Text style={styles.itemDescription}>
                {item.description}
              </Text>

              <Text style={styles.itemPrice}>
                R{item.price}
              </Text>

              {/* Edit and delete buttons */}
              <View style={styles.actionContainer}>

                <Pressable
                  style={styles.editButton}
                  onPress={() => editItem(item)}
                >
                  <Text style={styles.actionText}>
                    Edit
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteItem(item.id)}
                >
                  <Text style={styles.actionText}>
                    Delete
                  </Text>
                </Pressable>

              </View>

            </View>

          ))

        )}

      </ScrollView>

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
    marginTop: 15,
    color: "#246BCE",
  },

  welcome: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555555",
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
    fontSize: 13,
  },

  selectedText: {
    color: "white",
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

  cancelButton: {
    backgroundColor: "#eeeeee",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 8,
  },

  cancelText: {
    color: "#333333",
    fontWeight: "bold",
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

  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 12,
    color: "#222222",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#246BCE",
  },

  statLabel: {
    fontSize: 13,
    color: "#555555",
    marginTop: 5,
    textAlign: "center",
  },

  courseStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  courseStatCard: {
    backgroundColor: "white",
    width: "31%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  courseStatNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#246BCE",
  },

  searchContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 7,
    padding: 12,
    marginBottom: 15,
  },

  clearButton: {
    backgroundColor: "#eeeeee",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  clearText: {
    color: "#246BCE",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#666666",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },

  itemCourse: {
    color: "#555555",
    marginTop: 5,
  },

  itemDescription: {
    fontSize: 14,
    marginTop: 5,
    color: "#555555",
  },

  itemPrice: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    color: "#246BCE",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },

  editButton: {
    backgroundColor: "#246BCE",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#d93636",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },

  actionText: {
    color: "white",
    fontWeight: "bold",
  },

});
