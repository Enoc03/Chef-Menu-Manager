 ## Christoffel's Menu Manager

Christoffel's Menu Manager is a menu management application designed to help chefs and restaurant managers organise and manage their food menus efficiently.

The application provides a simple and user-friendly interface where users can add new dishes, update existing menu items, remove dishes, manage menu categories and monitor menu statistics.

The system aims to make menu management easier, more organised and accessible.

 ## Features

- Add a dish name
- Add a dish description
- Select a course
- Enter a price
- Input validation
- Display added menu items 

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

- A screen displaying the application layout and the features and categories inculding the search and filter menu and the menu statistics.

<img width="518" height="933" alt="image" src="https://github.com/user-attachments/assets/109744f0-7f2b-4158-a444-2659f3e84a77" />

<img width="506" height="942" alt="image" src="https://github.com/user-attachments/assets/70c1c0df-1195-4ecf-828b-9b72a969ce00" />

- The screen is displaying a "Menu item succsfully added" when new items are added.
- An option to edit or delete an existing menu which can be located using the filter menu by the course or searching for the dish name.

<img width="470" height="940" alt="image" src="https://github.com/user-attachments/assets/1e0da5c5-38be-407b-af3f-96b9aa395b77" />


## Technologies 
- React Native
- Expo Snack
- JavaScript
- React Hooks (`useState`)
- StyleSheet for application styling

## Project Structure

Christoffels-Menu-Manager/
│
├── App.js
├── assets/
├── package.json
└── README.md

## References

1. Expo (n.d.). Expo Documentation. https://docs.expo.dev/

2. Meta Open Source (n.d.). React – useState. https://react.dev/reference/react/useState

3. Meta Open Source (n.d.). React – Responding to Events. https://react.dev/learn/responding-to-events

4. Meta (n.d.). React Native Components and APIs. https://reactnative.dev/docs/components-and-apis

5. Meta (n.d.). React Native StyleSheet. https://reactnative.dev/docs/stylesheet

6. Mozilla (n.d.). JavaScript Array.prototype.map(). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

## License

This project is available for educational and demonstration purposes. No formal open-source licence has been assigned.   
