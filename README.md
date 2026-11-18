# Chef's Menu Manager — Final Portfolio of Evidence (POE)

## 📌 Project Overview
**Chef's Menu Manager** is a React Native mobile application designed to modernize restaurant menu operations[cite: 6]. It enables chefs to efficiently create, manage, search, and analyze menu items, while providing staff members with a clean real-time view of all available courses[cite: 1, 2, 6].

---

## 🔗 Submission Links
* **GitHub Repository:** [https://github.com/St10477315/Mobile-App-Scripting](https://github.com/St10477315/Mobile-App-Scripting)[cite: 6]
* **Video Demonstration (Unlisted YouTube):** [https://youtu.be/2ZHZIX8K604](https://youtu.be/2ZHZIX8K604)[cite: 5, 6]

---

## changelog / Change Log (Part 2 to Final POE)

### 1. Menu Item Management (CRUD)
* **Added Editing & Updating:** Implemented functionality allowing the chef to select any existing menu item, load its details into the input form, modify them, and update the state instantly[cite: 1].
* **Added Deletion Logic:** Implemented secure item deletion with confirmation alerts (supporting both native mobile alerts and web-compatible confirmation dialogues)[cite: 1].
* **Real-Time UI Reflection:** Ensured all changes made by the chef reflect immediately across the application[cite: 1].

### 2. Search and Filter Features
* **Name Search Bar:** Added a real-time search input allowing the chef and staff to quickly locate dishes by entering their name[cite: 2].
* **Course Filtering Chips:** Created dedicated category filter controls (*Starter*, *Main Course*, *Dessert*, and *All*) to filter the menu dynamically[cite: 2].

### 3. Menu Statistics Dashboard
* **Dynamic Calculations:** Added a statistics overview panel displaying:
  * Total number of menu items on record[cite: 2].
  * Overall average price across all dishes[cite: 2].
  * Breakdown counts for items available in each course category (*Starter*, *Main Course*, *Dessert*)[cite: 2].

### 4. Code Refactoring & Enhancements
* **Modular Code Structure:** Organized components, context providers, and screen routing cleanly using Expo Router.
* **Input Validation & Feedback:** Added robust validation checks to prevent incomplete entries or invalid numeric pricing, accompanied by clean success and error messaging[cite: 3, 4].
* **UI/UX Consistency:** Maintained a responsive layout and consistent color palette across all views (Homepage, Login, Chef Profile, and Staff View)[cite: 3, 4, 6].
