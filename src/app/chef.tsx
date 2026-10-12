import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define an interface for a menu item
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

export default function ChefScreen() {
  // Input states
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  // Menu list state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Handle saving and validating a dish
  const handleSaveItem = () => {
    // 1. Validation for required fields
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // 2. Create new item object
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description: description,
      course: course,
      price: price,
    };

    // 3. Add to list and clear form
    setMenuItems((prevItems) => [...prevItems, newItem]);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starter');

    // 4. Success confirmation message
    Alert.alert('Success', 'Menu item successfully added!');
  };

  // Render individual menu item card
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>R{item.price}</Text>
      </View>
      <Text style={styles.cardCourse}>{item.course}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App Header / Title */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
        <Text style={styles.headerSubtitle}>Chef Profile</Text>
      </View>

      {/* Main Container using FlatList to handle scrolling and list items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add New Menu Item</Text>

            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter ingredients and preparation"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Course Category *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue) => setCourse(itemValue)}>
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Course" value="Main Course" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>

            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <View style={styles.buttonContainer}>
              <Button title="Save Dish" color="#6200ee" onPress={handleSaveItem} />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Current Menu</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No menu items have been added yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  formContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 14,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  cardCourse: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
});