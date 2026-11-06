
import React, { useMemo, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";

// Available menu categories
const COURSES = ["Starter", "Main Course", "Dessert", "Drink"];
const FILTERS = ["All", ...COURSES];
const CURRENCY = "R";

// REUSABLE COMPONENT 1: Section heading
function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

// REUSABLE COMPONENT 2: Dashboard statistics
function StatCard({ label, value, detail }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {detail ? (
        <Text style={styles.statDetail}>{detail}</Text>
      ) : null}
    </View>
  );
}

// REUSABLE COMPONENT 3: Form input
function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
  maxLength,
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.descriptionInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8294AD"
        multiline={multiline}
        keyboardType={keyboardType || "default"}
        maxLength={maxLength || 100}
        textAlignVertical={multiline ? "top" : "center"}
        autoCapitalize="sentences"
      />
    </View>
  );
}

// REUSABLE COMPONENT 4: Application buttons
function AppButton({
  title,
  onPress,
  variant = "primary",
  compact = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        styles[`${variant}Button`],
        compact && styles.compactButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          styles[`${variant}ButtonText`],
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// REUSABLE COMPONENT 5: Course selection
function ChoicePills({ options, selected, onSelect }) {
  return (
    <View style={styles.pillContainer}>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onSelect(option)}
          accessibilityRole="button"
          accessibilityState={{
            selected: selected === option,
          }}
          style={[
            styles.pill,
            selected === option && styles.pillSelected,
          ]}
        >
          <Text
            style={[
              styles.pillText,
              selected === option && styles.pillTextSelected,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// REUSABLE COMPONENT 6: Menu item card
function MenuItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.menuCard}>
      <View style={styles.menuCardTop}>
        <View style={styles.menuCardText}>
          <Text style={styles.itemName}>
            {item.dishName}
          </Text>
          <Text style={styles.itemCourse}>
            {item.course}
          </Text>
        </View>

        <Text style={styles.itemPrice}>
          {CURRENCY}{item.price}
        </Text>
      </View>

      <Text style={styles.itemDescription}>
        {item.description}
      </Text>

      <View style={styles.cardActions}>
        <AppButton
          title="Edit"
          variant="secondary"
          compact
          onPress={onEdit}
        />
        <AppButton
          title="Delete"
          variant="danger"
          compact
          onPress={onDelete}
        />
      </View>
    </View>
  );
}

// MAIN APPLICATION
export default function App() {
  // Form information
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  // Menu information
  const [menuItems, setMenuItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Navigation and search
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Feedback messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clear form information
  const clearForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setEditingId(null);
    setError("");
  };

  // Display success or error messages
  const showMessage = (message, type = "success") => {
    setError(type === "error" ? message : "");
    setSuccess(type === "success" ? message : "");
  };

  // Validate the form before saving
  const validateForm = () => {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      return "Please complete all fields before saving.";
    }

    if (dishName.trim().length < 2) {
      return "Dish name must contain at least 2 characters.";
    }

    const cleanedPrice = price.trim().replace(",", ".");
    const validPrice = /^\d+(\.\d{1,2})?$/.test(cleanedPrice);
    const numericPrice = Number(cleanedPrice);

    if (
      !validPrice ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      return "Enter a valid price greater than R0.00.";
    }

    return "";
  };

  // Add a new dish or update an existing dish
  const saveItem = () => {
    setSuccess("");

    const validationMessage = validateForm();

    if (validationMessage) {
      showMessage(validationMessage, "error");
      return;
    }

    const cleanPrice = Number(
      price.trim().replace(",", ".")
    ).toFixed(2);

    const itemDetails = {
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: cleanPrice,
    };

    if (editingId) {
      // Update an existing dish
      setMenuItems((items) =>
        items.map((item) =>
          item.id === editingId
            ? { ...item, ...itemDetails }
            : item
        )
      );

      showMessage(
        `${itemDetails.dishName} was successfully updated.`
      );
    } else {
      // Add a new dish
      const newItem = {
        id: `${Date.now()}-${Math.random()}`,
        ...itemDetails,
      };

      setMenuItems((items) => [...items, newItem]);

      showMessage(
        `${itemDetails.dishName} was successfully added.`
      );
    }

    clearForm();
    setActiveTab("Manage Menu");
  };

  // Load a dish into the form for editing
  const editItem = (item) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);

    setError("");
    setSuccess("");
    setActiveTab("Manage Menu");
  };

  // Delete a dish after confirmation
  const deleteItem = (id) => {
    Alert.alert(
      "Delete menu item",
      "Are you sure you want to delete this dish?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const itemToDelete = menuItems.find(
              (item) => item.id === id
            );

            setMenuItems((items) =>
              items.filter((item) => item.id !== id)
            );

            if (editingId === id) {
              clearForm();
            }

            showMessage(
              `${itemToDelete ? itemToDelete.dishName : "Menu item"} was deleted.`
            );
          },
        },
      ]
    );
  };

  // Calculate dashboard statistics
  const totalItems = menuItems.length;

  const totalValue = menuItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const averagePrice = totalItems
    ? totalValue / totalItems
    : 0;

  // Count dishes in each course
  const courseCounts = COURSES.reduce((counts, name) => {
    counts[name] = menuItems.filter(
      (item) => item.course === name
    ).length;

    return counts;
  }, {});

  // Search and filter menu items
  const filteredItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesSearch =
        item.dishName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      const matchesCourse =
        selectedFilter === "All" ||
        item.course === selectedFilter;

      return matchesSearch && matchesCourse;
    });
  }, [menuItems, searchText, selectedFilter]);

  // Reset search and filters
  const resetFilters = () => {
    setSearchText("");
    setSelectedFilter("All");
  };

  // Display menu items or an empty message
  const renderMenuItems = (items) => {
    if (items.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>
            {menuItems.length === 0
              ? "Your menu is empty"
              : "No dishes found"}
          </Text>

          <Text style={styles.emptyText}>
            {menuItems.length === 0
              ? "Add your first dish to start building your menu."
              : "Try another search or clear your filters."}
          </Text>

          {menuItems.length === 0 ? (
            <AppButton
              title="Add your first dish"
              onPress={() => setActiveTab("Manage Menu")}
            />
          ) : (
            <AppButton
              title="Clear filters"
              variant="secondary"
              onPress={resetFilters}
            />
          )}
        </View>
      );
    }

    return items.map((item) => (
      <MenuItemCard
        key={item.id}
        item={item}
        onEdit={() => editItem(item)}
        onDelete={() => deleteItem(item.id)}
      />
    ));
  };

  // MAIN APPLICATION INTERFACE
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#173F78"
      />

      {/* Original application heading */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            Christoffel's Menu Manager
          </Text>

          <Text style={styles.brandEyebrow}>
            HEY CHEF!
          </Text>
        </View>
      </View>

      {/* Navigation tabs */}
      <View style={styles.navigation}>
        {["Dashboard", "Manage Menu"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              setError("");
              setSuccess("");
            }}
            style={[
              styles.navTab,
              activeTab === tab && styles.navTabActive,
            ]}
          >
            <Text
              style={[
                styles.navText,
                activeTab === tab && styles.navTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* DASHBOARD SCREEN */}
        {activeTab === "Dashboard" ? (
          <>
            <View style={styles.welcomeBlock}>
              <Text style={styles.pageTitle}>
                Dashboard
              </Text>

              <Text style={styles.pageSubtitle}>
                Here is an overview of your menu.
              </Text>
            </View>

            {/* Statistics cards */}
            <View style={styles.statsGrid}>
              <StatCard
                label="Total dishes"
                value={totalItems}
                detail="Items on your menu"
              />

              <StatCard
                label="Average price"
                value={`${CURRENCY}${averagePrice.toFixed(2)}`}
                detail="Across all dishes"
              />

              <StatCard
                label="Menu value"
                value={`${CURRENCY}${totalValue.toFixed(2)}`}
                detail="Combined listed prices"
              />

              <StatCard
                label="Main courses"
                value={courseCounts["Main Course"]}
                detail="Main course dishes"
              />
            </View>

            {/* Menu category breakdown */}
            <SectionTitle
              title="Menu by course"
              subtitle="A breakdown of your menu categories."
            />

            <View style={styles.courseSummary}>
              {COURSES.map((name) => (
                <View
                  style={styles.courseSummaryRow}
                  key={name}
                >
                  <Text style={styles.courseSummaryName}>
                    {name}
                  </Text>

                  <Text style={styles.courseSummaryCount}>
                    {courseCounts[name]}
                  </Text>
                </View>
              ))}
            </View>

            {/* Recently added dishes */}
            <View style={styles.sectionHeaderRow}>
              <SectionTitle
                title="Recently added"
                subtitle="Your latest menu items."
              />

              <Pressable
                onPress={() => setActiveTab("Manage Menu")}
              >
                <Text style={styles.viewAll}>
                  View all
                </Text>
              </Pressable>
            </View>

            {renderMenuItems(
              [...menuItems].slice(-3).reverse()
            )}

            <AppButton
              title="＋ Add a menu item"
              onPress={() => {
                clearForm();
                setActiveTab("Manage Menu");
              }}
            />
          </>
        ) : (
          <>
            {/* MANAGE MENU SCREEN */}
            <View style={styles.welcomeBlock}>
              <Text style={styles.pageTitle}>
                Manage your menu
              </Text>

              <Text style={styles.pageSubtitle}>
                Add new dishes or update your existing menu.
              </Text>
            </View>

            {/* Add and edit form */}
            <View style={styles.formCard}>
              <SectionTitle
                title={
                  editingId
                    ? "Edit menu item"
                    : "Add a menu item"
                }
                subtitle={
                  editingId
                    ? "Change the details and save your updates."
                    : "Enter the details of the dish you want to add."
                }
              />

              <FormField
                label="Dish name"
                value={dishName}
                onChangeText={setDishName}
                placeholder="e.g. Chicken and rice bowl"
                maxLength={50}
              />

              <FormField
                label="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the dish and its ingredients"
                multiline
                maxLength={180}
              />

              <Text style={styles.label}>
                Course
              </Text>

              <ChoicePills
                options={COURSES}
                selected={course}
                onSelect={setCourse}
              />

              <FormField
                label="Price (ZAR)"
                value={price}
                onChangeText={(value) =>
                  setPrice(value.replace(/[^0-9.,]/g, ""))
                }
                placeholder="e.g. 89.99"
                keyboardType="decimal-pad"
                maxLength={10}
              />

              {/* Error and success messages */}
              {error ? (
                <Text
                  accessibilityRole="alert"
                  style={styles.errorMessage}
                >
                  {error}
                </Text>
              ) : null}

              {success ? (
                <Text
                  accessibilityRole="alert"
                  style={styles.successMessage}
                >
                  {success}
                </Text>
              ) : null}

              <AppButton
                title={
                  editingId
                    ? "Save changes"
                    : "Add menu item"
                }
                onPress={saveItem}
              />

              {editingId ? (
                <AppButton
                  title="Cancel editing"
                  variant="secondary"
                  onPress={clearForm}
                />
              ) : null}
            </View>

            {/* Search and filtering */}
            <SectionTitle
              title={`Your menu (${filteredItems.length})`}
              subtitle="Search, filter, edit or remove your dishes."
            />

            <View style={styles.filterCard}>
              <FormField
                label="Search dishes"
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search by dish name or description"
              />

              <Text style={styles.label}>
                Filter by course
              </Text>

              <ChoicePills
                options={FILTERS}
                selected={selectedFilter}
                onSelect={setSelectedFilter}
              />

              {(searchText || selectedFilter !== "All") ? (
                <Pressable
                  onPress={resetFilters}
                  style={styles.clearFilters}
                >
                  <Text style={styles.clearFiltersText}>
                    Clear search and filters
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {/* Display filtered menu items */}
            {renderMenuItems(filteredItems)}
          </>
        )}

        <Text style={styles.footer}>
          Christoffel's Menu Manager
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// APPLICATION STYLING
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F7FC",
  },

  // Blue header with original application branding
  header: {
    backgroundColor: "#173F78",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 22,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  brandEyebrow: {
    color: "#BBD7FF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 7,
  },

  // Navigation
  navigation: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#DCE7F5",
  },

  navTab: {
    paddingVertical: 15,
    marginRight: 25,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },

  navTabActive: {
    borderBottomColor: "#4F8FE8",
  },

  navText: {
    color: "#637A99",
    fontSize: 14,
    fontWeight: "600",
  },

  navTextActive: {
    color: "#173F78",
    fontWeight: "800",
  },

  // Main content
  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 18,
    paddingBottom: 35,
  },

  welcomeBlock: {
    marginBottom: 18,
  },

  pageTitle: {
    color: "#173F78",
    fontSize: 24,
    fontWeight: "800",
  },

  pageSubtitle: {
    color: "#637A99",
    fontSize: 13,
    marginTop: 5,
  },

  // Dashboard statistics
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  statCard: {
    width: "48.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  statValue: {
    color: "#173F78",
    fontSize: 22,
    fontWeight: "800",
  },

  statLabel: {
    color: "#405A78",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  statDetail: {
    color: "#8294AD",
    fontSize: 10,
    marginTop: 4,
  },

  // Section headings
  sectionTitleWrap: {
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#173F78",
    fontSize: 17,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#8294AD",
    fontSize: 12,
    marginTop: 4,
  },

  // Course statistics
  courseSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  courseSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F8",
  },

  courseSummaryName: {
    color: "#405A78",
    fontSize: 13,
  },

  courseSummaryCount: {
    color: "#173F78",
    fontSize: 13,
    fontWeight: "800",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  viewAll: {
    color: "#245DA8",
    fontWeight: "800",
    fontSize: 12,
    marginTop: 3,
  },

  // Forms
  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 16,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  fieldWrap: {
    marginBottom: 13,
  },

  label: {
    color: "#29476B",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
  },

  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#D4E2F4",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#173F78",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
  },

  descriptionInput: {
    minHeight: 82,
    paddingTop: 12,
  },

  // Course selection
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
    marginTop: 2,
  },

  pill: {
    borderWidth: 1,
    borderColor: "#D4E2F4",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 7,
    marginBottom: 7,
    backgroundColor: "#FFFFFF",
  },

  pillSelected: {
    backgroundColor: "#245DA8",
    borderColor: "#245DA8",
  },

  pillText: {
    color: "#526985",
    fontSize: 11,
    fontWeight: "700",
  },

  pillTextSelected: {
    color: "#FFFFFF",
  },

  // Buttons
  button: {
    minHeight: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: "#245DA8",
  },

  secondaryButton: {
    backgroundColor: "#EAF2FC",
    borderWidth: 1,
    borderColor: "#D4E2F4",
  },

  dangerButton: {
    backgroundColor: "#FCEDEC",
    borderWidth: 1,
    borderColor: "#F2D2CF",
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "800",
  },

  primaryButtonText: {
    color: "#FFFFFF",
  },

  secondaryButtonText: {
    color: "#29476B",
  },

  dangerButtonText: {
    color: "#B43D35",
  },

  compactButton: {
    minHeight: 36,
    minWidth: 86,
    marginTop: 0,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  // Feedback messages
  errorMessage: {
    color: "#B42318",
    backgroundColor: "#FFF1F0",
    padding: 11,
    borderRadius: 8,
    fontSize: 12,
    marginBottom: 8,
  },

  successMessage: {
    color: "#216B43",
    backgroundColor: "#EAF6EE",
    padding: 11,
    borderRadius: 8,
    fontSize: 12,
    marginBottom: 8,
  },

  // Search and filters
  clearFilters: {
    alignSelf: "flex-start",
    paddingVertical: 5,
  },

  clearFiltersText: {
    color: "#245DA8",
    fontSize: 12,
    fontWeight: "800",
  },

  // Menu item cards
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  menuCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  menuCardText: {
    flex: 1,
    paddingRight: 10,
  },

  itemName: {
    color: "#173F78",
    fontSize: 16,
    fontWeight: "800",
  },

  itemCourse: {
    color: "#245DA8",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 5,
  },

  itemPrice: {
    color: "#173F78",
    fontSize: 16,
    fontWeight: "900",
  },

  itemDescription: {
    color: "#637A99",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 14,
  },

  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },

  // Empty-state display
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DCE7F5",
  },

  emptyTitle: {
    color: "#173F78",
    fontSize: 15,
    fontWeight: "800",
  },

  emptyText: {
    color: "#8294AD",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 8,
  },

  footer: {
    color: "#8294AD",
    textAlign: "center",
    fontSize: 10,
    marginTop: 25,
    marginBottom: 5,
  },
});
