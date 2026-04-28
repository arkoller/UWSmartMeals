// User Accounts Database

let david_id = {
  name: "David Smith",
  email: "dsmith@gmail.com",
  password: "password123",
};

let jane_id = {
  name: "Jane Doe",
  email: "jjdoe@gmail.com",
  password: "pass1",
};

db.collection("user_accounts").doc("david_id").set(david_id);
db.collection("user_accounts").doc("jane_id").set(jane_id);

// Meal Ideas Database

let avocado_egg = {
  meal_name: "Avocado Egg Toast",
  description:
    "Toast with mashed avocado, hard-boiled eggs, strawberries, and milk.",
  grocery_item: ["Bread", "Avocados", "Eggs", "Strawberries", "Milk"],
  image_id: "link.com",
};

let french_toast = {
  meal_name: "French Toast & Sausage",
  description: "Cinnamon French toast with sausage, bananas, and milk.",
  grocery_item: [
    "Bread",
    "Eggs",
    "Milk",
    "Cinnamon",
    "Sugar",
    "Butter",
    "Maple Syrup",
    "Sausage",
    "Bananas",
  ],
  image_id: "link.com",
};

db.collection("meal_ideas").doc("avocado_egg").set(avocado_egg);
db.collection("meal_ideas").doc("french_toast").set(french_toast);

// Grocery List

let david_list = {
  user_id: "david_id",
  grocery_item: ["Bread", "Avocados", "Eggs", "Strawberries", "Milk"],
};

let jane_list = {
  user_id: "jane_id",
  grocery_list: [
    "Bread",
    "Eggs",
    "Milk",
    "Cinnamon",
    "Sugar",
    "Butter",
    "Maple Syrup",
    "Sausage",
    "Bananas",
  ],
};

db.collection("grocery_list").doc("david_list").set(david_list);
db.collection("grocery_list").doc("jane_list").set(jane_list);
