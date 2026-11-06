 ## Christoffel's Menu Manager

Christoffel's Menu Manager is a menu management application designed to help chefs and restaurant managers organise and manage their food menus efficiently.

The application provides a simple and user-friendly interface where users can add new dishes, update existing menu items, remove dishes, manage menu categories and monitor menu statistics.

The system aims to make menu management easier, more organised and accessible.

## Features 

Dashboard: Displays an overview of the menu, including total dishes, average dish price, total menu value and main course statistics.

Add Menu Items: Add dishes by entering the dish name, description, course category and price.

Edit Menu Items: Update existing dish information.

Delete Menu Items: Remove dishes from the menu with a confirmation prompt.

Search Function: Search for dishes using their names or descriptions.

Category Filtering: Filter dishes according to Starter, Main Course, Dessert and Drink categories.

Input Validation: Ensures that required fields are completed and that valid prices are entered.

Currency Support: Displays menu prices in South African Rand (ZAR).

## New Features Added

The application has been updated with additional features to make managing menu items easier and more efficient.

1. Manage Menu Items
- Edit existing menu items.
- Update dish names, descriptions, courses and prices.
- Delete menu items that are no longer needed.
- Changes are displayed immediately in the application.
- Confirmation message before deleting an item.

2. Search and Filter Menu Items
- Search for menu items using their names.
- Filter menu items by course.
- Available filters include Starter, Main Course and Dessert.
- View all menu items using the All filter.
- Clear the search and filters to display all menu items again.

3. Menu Statistics
- Display the total number of menu items.
- Calculate the average price of all menu items.
- Display the number of Starters.
- Display the number of Main Courses.
- Display the number of Desserts.
- Statistics update automatically when menu items are added, edited or deleted.

4. Improved User Experience
- Added clear success and error messages.
- Added buttons for editing and deleting menu items.
- Improved menu organisation and navigation.
- Used React Native state (`useState`) to update information immediately.
- Limitations- menu data resets after reloading.

## Future Improvements

Integrate a database for permanent menu storage.

Add user authentication and account management.

Allow users to upload images of dishes.

Introduce menu export and reporting functionality.

Improve menu management with additional features.

## Application Screens

Dashboard

Provides an overview of menu statistics and recently added dishes.

Manage Menu

Allows users to add, edit, delete, search and filter menu items.

## Screenshots 

Dashboard

<img width="407" height="841" alt="image" src="https://github.com/user-attachments/assets/c0496c87-1261-4c3a-8b5d-c6747e6ba7a4" />

Manage Menu

<img width="407" height="840" alt="image" src="https://github.com/user-attachments/assets/e8f97377-a2f3-4091-83e9-77707bf20a10" />

## Technologies 
- React Native
- Expo Snack
- JavaScript
- React Hooks (`useState`)
- StyleSheet for application styling

## Project Structure

'''text 
Christoffels-Menu-Manager/
│
├── App.js
├── assets/
├── package.json
└── README.md
'''

## References

1. Expo (n.d.). Expo Documentation. https://docs.expo.dev/

2. Meta Open Source (n.d.). React – useState. https://react.dev/reference/react/useState

3. Meta Open Source (n.d.). React – Responding to Events. https://react.dev/learn/responding-to-events

4. Meta (n.d.). React Native Components and APIs. https://reactnative.dev/docs/components-and-apis

5. Meta (n.d.). React Native StyleSheet. https://reactnative.dev/docs/stylesheet

6. Mozilla (n.d.). JavaScript Array.prototype.map(). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

## License

This project is available for educational and demonstration purposes. No formal open-source licence has been assigned.   
