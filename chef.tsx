import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function ChefScreen() {
  // State Management
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with tomato and olive oil.', course: 'Starter', price: '65.00' },
    { id: '2', name: 'Filet Mignon', description: 'Tender beef steak served with mushroom sauce and roasted potatoes.', course: 'Main Course', price: '220.00' },
    { id: '3', name: 'Malva Pudding', description: 'Sweet spongy apricot pudding served warm with custard.', course: 'Dessert', price: '75.00' },
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');
  
  // Edit & Filter State
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Validate and Add or Update Item
  const handleSaveItem = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields (Name, Description, and Price).');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid numeric price greater than 0.');
      return;
    }

    if (editingId) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingId
            ? { ...item, name, description, course, price: parseFloat(price).toFixed(2) }
            : item
        )
      );
      Alert.alert('Success', 'Menu item updated successfully!');
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now().toString(),
        name,
        description,
        course,
        price: parseFloat(price).toFixed(2),
      };
      setMenuItems([...menuItems, newItem]);
      Alert.alert('Success', 'New menu item added successfully!');
    }

    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  // Edit Item
  const handleEditItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(menuItems.filter((item) => item.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setName('');
              setDescription('');
              setPrice('');
            }
          },
        },
      ]
    );
  };

  // Statistics Calculations
  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? (
          menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / totalItems
        ).toFixed(2)
      : '0.00';

  const countByCourse = (courseName) =>
    menuItems.filter((item) => item.course === courseName).length;

  // Filtered List Logic
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.course === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
          <Text style={styles.subtitle}>Overview, Statistics & Management</Text>

          {/* Statistics Dashboard */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsHeader}>Menu Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {averagePrice}</Text>
                <Text style={styles.statLabel}>Avg Price</Text>
              </View>
            </View>
            <View style={styles.courseCountRow}>
              <Text style={styles.courseCountText}>Starters: {countByCourse('Starter')}</Text>
              <Text style={styles.courseCountText}>Mains: {countByCourse('Main Course')}</Text>
              <Text style={styles.courseCountText}>Desserts: {countByCourse('Dessert')}</Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (Ingredients, preparation...)"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.label}>Select Course:</Text>
            <View style={styles.courseSelector}>
              {['Starter', 'Main Course', 'Dessert'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.courseButton,
                    course === cat && styles.courseButtonSelected,
                  ]}
                  onPress={() => setCourse(cat)}
                >
                  <Text
                    style={[
                      styles.courseButtonText,
                      course === cat && styles.courseButtonTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Price (e.g., 85.00)"
              placeholderTextColor="#888"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
              <Text style={styles.saveButtonText}>
                {editingId ? 'Update Menu Item' : 'Add to Menu'}
              </Text>
            </TouchableOpacity>

            {editingId && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setEditingId(null);
                  setName('');
                  setDescription('');
                  setPrice('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Search & Filter Section */}
          <View style={styles.searchFilterContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search dish by name..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
              {['All', 'Starter', 'Main Course', 'Dessert'].map((filterCat) => (
                <TouchableOpacity
                  key={filterCat}
                  style={[
                    styles.filterChip,
                    selectedFilter === filterCat && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedFilter(filterCat)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedFilter === filterCat && styles.filterChipTextSelected,
                    ]}
                  >
                    {filterCat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Menu Items List */}
          <Text style={styles.sectionHeader}>Current Menu ({filteredItems.length})</Text>
          {filteredItems.length === 0 ? (
            <Text style={styles.emptyText}>No menu items found.</Text>
          ) : (
            filteredItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardPrice}>R {item.price}</Text>
                </View>
                <Text style={styles.cardCourse}>Course: {item.course}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.editActionBtn}
                    onPress={() => handleEditItem(item)}
                  >
                    <Text style={styles.actionBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteActionBtn}
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <Text style={styles.actionBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Delete Item
  const handleDeleteItem = (id: string) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this menu item?');
      if (confirmed) {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
        if (editingId === id) {
          setEditingId(null);
          setName('');
          setDescription('');
          setPrice('');
        }
      }
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setName('');
              setDescription('');
              setPrice('');
            }
          },
        },
      ]
    );
  };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#343a40', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6c757d', textAlign: 'center', marginBottom: 16 },
  statsContainer: { backgroundColor: '#ffffff', borderRadius: 8, padding: 12, marginBottom: 16, elevation: 2 },
  statsHeader: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statBox: { flex: 1, backgroundColor: '#e9ecef', padding: 8, borderRadius: 6, alignItems: 'center', marginHorizontal: 4 },
  statNumber: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  statLabel: { fontSize: 12, color: '#6c757d' },
  courseCountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingHorizontal: 4 },
  courseCountText: { fontSize: 12, color: '#495057', fontWeight: '600' },
  formContainer: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 2 },
  formTitle: { fontSize: 18, fontWeight: 'bold', color: '#343a40', marginBottom: 12 },
  input: { backgroundColor: '#f1f3f5', borderWidth: 1, borderColor: '#ced4da', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 12, color: '#212529' },
  textArea: { height: 70, textAlignVertical: 'top' },
  label: { fontSize: 14, fontWeight: '600', color: '#495057', marginBottom: 6 },
  courseSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  courseButton: { flex: 1, paddingVertical: 8, borderWidth: 1, borderColor: '#ced4da', borderRadius: 6, alignItems: 'center', marginHorizontal: 2, backgroundColor: '#f8f9fa' },
  courseButtonSelected: { backgroundColor: '#4c6ef5', borderColor: '#4c6ef5' },
  courseButtonText: { fontSize: 12, color: '#495057', fontWeight: '600' },
  courseButtonTextSelected: { color: '#ffffff' },
  saveButton: { backgroundColor: '#2b8a3e', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#868e96', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { color: '#ffffff', fontSize: 14 },
  searchFilterContainer: { marginBottom: 16 },
  filterRow: { flexDirection: 'row', marginBottom: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e9ecef', borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: '#ced4da' },
  filterChipSelected: { backgroundColor: '#343a40', borderColor: '#343a40' },
  filterChipText: { fontSize: 12, color: '#495057', fontWeight: '600' },
  filterChipTextSelected: { color: '#ffffff' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#343a40', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#868e96', fontStyle: 'italic', marginTop: 10, marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 8, padding: 12, marginBottom: 12, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#4c6ef5' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#2b8a3e' },
  cardCourse: { fontSize: 12, fontWeight: '600', color: '#4c6ef5', marginBottom: 6 },
  cardDescription: { fontSize: 13, color: '#6c757d', marginBottom: 10 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#f1f3f5', paddingTop: 8 },
  editActionBtn: { backgroundColor: '#fab005', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, marginRight: 8 },
  deleteActionBtn: { backgroundColor: '#fa5252', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  actionBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
});