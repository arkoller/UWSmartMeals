const meals = [
  {
    meal_id: "1",
    meal_name: "Avocado Egg Toast",
    description:
      "Toast with mashed avocado, hard-boiled eggs, strawberries, and milk.",
    grocery_item: ["Bread", "Avocados", "Eggs", "Strawberries", "Milk"],
    meal_type: "Breakfast",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://www.allrecipes.com/thmb/8NccFzsaq0_OZPDKmf7Yee-aG78=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AvocadoToastwithEggFranceC4x3-bb87e3bbf1944657b7db35f1383fabdb.jpg",
  },
  {
    meal_id: "2",
    meal_name: "Scrambled Egg Breakfast",
    description: "Scrambled eggs with buttered toast, blueberries, and yogurt.",
    grocery_item: ["Eggs", "Bread", "Butter", "Blueberries", "Yogurt"],
    meal_type: "Breakfast",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://hips.hearstapps.com/hmg-prod/images/scrambled-eggs-socialindex-web-0066-lp-del039925-67eb04f9a151b.jpg?crop=0.502xw:1.00xh;0.464xw,0&resize=1200:*",
  },
  {
    meal_id: "3",
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
    meal_type: "Breakfast",
    diet: ["Nut-Free"],
    image_url:
      "https://images.ctfassets.net/hhv516v5f7sj/1bsvc4aebHaMMuLkq18chd/fa9276c9012407fd5e7861bdf6ba01d2/SausageChub_FrenchToast_1000x1000.jpg",
  },
  {
    meal_id: "4",
    meal_name: "Croissant Breakfast Sandwich",
    description:
      "Croissant sandwich with eggs, cheddar cheese, and strawberries.",
    grocery_item: [
      "Croissant",
      "Eggs",
      "Cheddar Cheese",
      "Butter",
      "Strawberries",
    ],
    meal_type: "Breakfast",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://quisinequeenb.com/wp-content/uploads/2019/10/White-Truffle-Croissant-Sandwich_closeup-1024x998.jpg",
  },
  {
    meal_id: "5",
    meal_name: "Waffles & Bacon",
    description: "Waffles with syrup, strawberries, bacon, and milk.",
    grocery_item: [
      "Waffle Mix",
      "Eggs",
      "Milk",
      "Butter",
      "Maple Syrup",
      "Strawberries",
      "Bacon",
    ],
    meal_type: "Breakfast",
    diet: ["Nut-Free"],
    image_url:
      "https://i0.wp.com/frugalhausfrau.com/wp-content/uploads/2019/03/Bacon-Waffles-4.jpg?ssl=1",
  },
  {
    meal_id: "6",
    meal_name: "Apple Walnut Oatmeal",
    description: "Warm oatmeal with apples, walnuts, and yogurt drink.",
    grocery_item: [
      "Rolled Oats",
      "Milk",
      "Walnuts",
      "Apples",
      "Drinkable Yogurt",
    ],
    meal_type: "Breakfast",
    diet: ["Vegetarian"],
    image_url:
      "https://caitsplate.com/wp-core/wp-content/uploads/2016/09/DSC_0577-3-683x1024.jpg",
  },
  {
    meal_id: "7",
    meal_name: "Chilaquiles",
    description:
      "Crispy tortillas with salsa, eggs, shredded cheese, and avocado.",
    grocery_item: [
      "Tortillas",
      "Eggs",
      "Shredded Cheese",
      "Salsa",
      "Avocados",
      "Orange Juice",
    ],
    meal_type: "Breakfast",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://www.lemontreedwelling.com/wp-content/uploads/2021/01/chilaquiles-featured.jpg",
  },
  {
    meal_id: "8",
    meal_name: "Yogurt Parfait",
    description: "Layered yogurt with granola, fruit, and nuts.",
    grocery_item: ["Yogurt", "Granola", "Strawberries", "Almonds"],
    meal_type: "Breakfast",
    diet: ["Vegetarian"],
    image_url:
      "https://www.thecountrycook.net/wp-content/uploads/2024/03/thumbnail-Yogurt-Parfaits-scaled.jpg",
  },
  {
    meal_id: "9",
    meal_name: "Peanut Butter Banana Toast",
    description: "Toast with peanut butter, honey, banana, and milk.",
    grocery_item: ["Bread", "Peanut Butter", "Honey", "Bananas", "Milk"],
    meal_type: "Breakfast",
    diet: ["Vegetarian"],
    image_url:
      "https://myminichefs.com/wp-content/uploads/2023/05/peanut-butter-toast-image.jpg",
  },
  {
    meal_id: "10",
    meal_name: "Smoothie Bowl",
    description: "Fruit smoothie bowl topped with granola and seeds.",
    grocery_item: [
      "Frozen Berries",
      "Protein Powder",
      "Yogurt",
      "Milk",
      "Granola",
      "Almonds",
      "Chia Seeds",
      "Coconut Flakes",
    ],
    meal_type: "Breakfast",
    diet: ["Vegetarian"],
    image_url:
      "https://butternutandsage.com/wp-content/uploads/2022/01/Berry-Delicious-Superfood-Smoothie-Bowls-with-Honey-Almond-Granola-15.jpg",
  },

  {
    meal_id: "11",
    meal_name: "Turkey Sandwich",
    description: "Turkey sandwich with chips and an apple.",
    grocery_item: [
      "Bread",
      "Turkey",
      "Cheddar Cheese",
      "Mayonnaise",
      "Mustard",
      "Lettuce",
      "Tomatoes",
      "Potato Chips",
      "Apples",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://enwnutrition.com/wp-content/uploads/2025/04/sourdough-turkey-sandwich-feature-square.jpeg",
  },
  {
    meal_id: "12",
    meal_name: "Cheese Pizza & Salad",
    description: "Cheese pizza with a side salad and milk.",
    grocery_item: [
      "Pizza Dough",
      "Pizza Sauce",
      "Mozzarella Cheese",
      "Lettuce",
      "Ranch Dressing",
      "Milk",
    ],
    meal_type: "Lunch",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://youplateit.com.au/wp-content/uploads/2022/01/Quattro-Formaggi-Pizza-Four-Cheese-0122-Plated.jpg",
  },
  {
    meal_id: "13",
    meal_name: "Ham & Cheese Melt",
    description: "Grilled ham and cheese sandwich with tomato soup.",
    grocery_item: [
      "Bread",
      "Butter",
      "Ham",
      "Cheddar Cheese",
      "Canned Tomato Soup",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://frommichigantothetable.com/wp-content/uploads/2022/03/MICHIGANTOTHETABLE_3-800x1200.jpg",
  },
  {
    meal_id: "14",
    meal_name: "Chicken Wrap",
    description: "Chicken wrap with hummus and pita chips.",
    grocery_item: [
      "Tortillas",
      "Chicken",
      "Hummus",
      "Feta Cheese",
      "Lettuce",
      "Cucumbers",
      "Pita Chips",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://www.cookingclassy.com/wp-content/uploads/2016/03/greek_grilled_chicken_hummus_wrap2..jpg",
  },
  {
    meal_id: "15",
    meal_name: "PB&J Sandwich",
    description:
      "Peanut butter and jelly sandwich with fruit, yogurt, and a cookie.",
    grocery_item: [
      "Bread",
      "Peanut Butter",
      "Jelly",
      "Oranges",
      "Yogurt",
      "Chocolate Chip Cookie",
    ],
    meal_type: "Lunch",
    diet: ["Vegetarian"],
    image_url:
      "https://oldworldgardenfarms.com/wp-content/uploads/2024/12/the-perfect-peanut-butter-and-jelly-sandwich.jpg",
  },
  {
    meal_id: "16",
    meal_name: "Pesto Pasta Salad",
    description:
      "Pasta salad with sausage, tomatoes, and mozzarella, served with apple juice.",
    grocery_item: [
      "Pasta",
      "Sausage",
      "Pesto",
      "Tomatoes",
      "Mozzarella Cheese",
      "Apple Juice",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://caitsplate.com/wp-core/wp-content/uploads/2019/11/IMG_7089.jpg",
  },
  {
    meal_id: "17",
    meal_name: "Vegetable Quesadilla",
    description: "Quesadilla with beans, vegetables, and salad.",
    grocery_item: [
      "Tortillas",
      "Black Beans",
      "Shredded Cheese",
      "Corn",
      "Tomatoes",
      "Avocados",
      "Lettuce",
      "Olive Oil",
      "Lime Dressing",
    ],
    meal_type: "Lunch",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://www.eatingwell.com/thmb/t-tzbOfVz5ACCOf4IpxNEFxgTLo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3926485-970b04d852e84ad59756905121455934.jpg",
  },
  {
    meal_id: "18",
    meal_name: "Lox Bagel",
    description: "Bagel with smoked salmon, cucumber, and yogurt.",
    grocery_item: [
      "Bagels",
      "Cream Cheese",
      "Smoked Salmon",
      "Lemon",
      "Dill",
      "Capers",
      "Cucumbers",
      "Yogurt",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://hips.hearstapps.com/hmg-prod/images/bagelandlox-4-1647470138.jpg?crop=0.673xw:1.00xh;0.155xw,0&resize=1200:*",
  },
  {
    meal_id: "19",
    meal_name: "Spaghetti",
    description: "Spaghetti with sausage and carrots.",
    grocery_item: [
      "Pasta",
      "Sausage",
      "Marinara Sauce",
      "Parmesan Cheese",
      "Carrots",
      "Ranch Dressing",
    ],
    meal_type: "Lunch",
    diet: ["Nut-Free"],
    image_url:
      "https://krollskorner.com/wp-content/uploads/2021/09/SausageandPastaBlog5.jpg",
  },
  {
    meal_id: "20",
    meal_name: "Teriyaki Tofu Bowl",
    description: "Tofu and broccoli in teriyaki sauce over rice.",
    grocery_item: [
      "Tofu",
      "Broccoli",
      "Teriyaki Sauce",
      "Rice",
      "Sesame Oil",
      "Soy Milk",
    ],
    meal_type: "Lunch",
    diet: ["Vegetarian", "Vegan", "Dairy-Free", "Nut-Free"],
    image_url:
      "https://jessicainthekitchen.com/wp-content/uploads/2021/06/Teriyaki-Tofu-14.jpg",
  },

  {
    meal_id: "21",
    meal_name: "Burrito Bowl",
    description: "Rice bowl with beans, meat, and toppings.",
    grocery_item: [
      "Rice",
      "Black Beans",
      "Chicken",
      "Avocados",
      "Sour Cream",
      "Lettuce",
      "Tomatoes",
      "Salsa",
    ],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://www.simplysissom.com/wp-content/uploads/2019/07/Healthy-Burrito-Bowls-With-Cilantro-Lime-Dressing-FI-1.jpg",
  },
  {
    meal_id: "22",
    meal_name: "Vegetable Curry",
    description: "Indian-style curry with rice and naan.",
    grocery_item: [
      "Pre-packaged palak paneer",
      "Pre-packaged chana masala",
      "Rice",
      "Naan Bread",
      "Butter",
    ],
    meal_type: "Dinner",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://thumbs.dreamstime.com/b/homemade-indian-vegetarian-dinner-chana-masala-palak-paneer-curry-451234642.jpg",
  },
  {
    meal_id: "23",
    meal_name: "Taco Dinner",
    description: "Tacos with beans and vegetables.",
    grocery_item: [
      "Ground Beef",
      "Tortillas",
      "Onions",
      "Bell Peppers",
      "Avocados",
      "Shredded Cheese",
      "Refried Beans",
    ],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://carriecarvalho.com/wp-content/uploads/2022/11/beef-blackbean-tacos_4372.jpg",
  },
  {
    meal_id: "24",
    meal_name: "Burger & Fries",
    description: "Classic burger with fries and salad.",
    grocery_item: [
      "Burger Buns",
      "Beef Patties",
      "Lettuce",
      "French Fries",
      "Ketchup",
    ],
    meal_type: "Dinner",
    diet: ["Dairy-Free", "Nut-Free"],
    image_url:
      "https://marleyspoon.com/media/recipes/242832/main_photos/medium/fast_actual_veggies_black_bean_cheeseburger-87a3f7e2734a9b7c514998290bb805d2.jpeg",
  },
  {
    meal_id: "25",
    meal_name: "Chicken Quesadilla",
    description: "Quesadilla with meat, beans, and salad.",
    grocery_item: [
      "Tortillas",
      "Chicken",
      "Bell Peppers",
      "Avocados",
      "Sour Cream",
      "Black Beans",
      "Lettuce",
      "Ranch Dressing",
    ],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://www.slenderkitchen.com/sites/default/files/styles/gsd-16x9/public/recipe_images/spicy-chicken-quesadillas_0.jpg",
  },
  {
    meal_id: "26",
    meal_name: "Mandarin Chicken",
    description: "Sweet chicken with rice, vegetables, and milk.",
    grocery_item: ["Mandarin Chicken", "Rice", "Mixed Vegetables", "Milk"],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://40aprons.com/wp-content/uploads/2021/08/mandarin-chicken-8.jpg",
  },
  {
    meal_id: "27",
    meal_name: "Pork Ramen",
    description: "Ramen with pork, egg, vegetables, and edamame.",
    grocery_item: [
      "Ramen Noodles",
      "Pork",
      "Eggs",
      "Mixed Vegetables",
      "Edamame",
    ],
    meal_type: "Dinner",
    diet: ["Dairy-Free", "Nut-Free"],
    image_url:
      "https://makeandtakes.com/wp-content/uploads/ramen-bowl-with-pork-egg-and-edamame.jpg",
  },
  {
    meal_id: "28",
    meal_name: "Nachos",
    description: "Nachos with cheese, beans, and salsa, served with juice.",
    grocery_item: [
      "Tortilla Chips",
      "Shredded Cheese",
      "Salsa",
      "Refried Beans",
      "Avocados",
      "Orange Juice",
    ],
    meal_type: "Dinner",
    diet: ["Vegetarian", "Nut-Free"],
    image_url:
      "https://foodbyjonister.com/wp-content/uploads/2018/04/nachos4.jpg",
  },
  {
    meal_id: "29",
    meal_name: "Beef Chili",
    description: "Hearty chili with chips and toppings.",
    grocery_item: [
      "Ground Beef",
      "Tomato Sauce",
      "Onion",
      "Shredded Cheese",
      "Sour Cream",
      "Tortilla Chips",
    ],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://res.cloudinary.com/hksqkdlah/image/upload/c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low/SFS_Best_Ground_Beef_Chili_75211_h9hljj",
  },
  {
    meal_id: "30",
    meal_name: "Pepperoni Pizza & Salad",
    description: "Pizza with salad and juice.",
    grocery_item: [
      "Pizza Dough",
      "Pizza Sauce",
      "Mozzarella Cheese",
      "Pepperoni",
      "Spinach",
      "Apple Juice",
    ],
    meal_type: "Dinner",
    diet: ["Nut-Free"],
    image_url:
      "https://www.simplywhisked.com/wp-content/uploads/2024/08/Pizza-Salad-2.jpg",
  },
];

function renderMeals(mealsToShow) {
  const container = document.querySelector(".recipes-container");
  container.innerHTML = "";

  if (mealsToShow.length === 0) {
    container.innerHTML = '<p class="no-results">No recipes found.</p>';
    return;
  }

  mealsToShow.forEach((meal) => {
    const item = document.createElement("div");
    item.className = "recipe-item";

    const imgHtml = meal.image_url
      ? `<img src="${meal.image_url}" alt="${meal.meal_name}" class="recipe-image">`
      : "";

    item.innerHTML = `
      ${imgHtml}
      <div class="recipe-details">
        <span class="recipe-text">${meal.meal_name}</span>
        <div class="description-row">
          <div class="recipe-description">${meal.description}</div>
          <button class="add-button" data-meal-id="${meal.meal_id}">Add to Meal Plan</button>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function applyFilters() {
  const query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  const selectedDiets = Array.from(
    document.querySelectorAll('input[name="diet-filter"]:checked')
  ).map((cb) => cb.value);
  const selectedMealTypes = Array.from(
    document.querySelectorAll('input[name="meal-type-filter"]:checked')
  ).map((cb) => cb.value);

  const filtered = meals.filter((meal) => {
    const textMatch =
      !query ||
      meal.meal_name.toLowerCase().includes(query) ||
      meal.description.toLowerCase().includes(query) ||
      meal.grocery_item.some((item) => item.toLowerCase().includes(query));

    const dietMatch =
      selectedDiets.length === 0 ||
      selectedDiets.every((diet) => meal.diet.includes(diet));

    const mealTypeMatch =
      selectedMealTypes.length === 0 ||
      selectedMealTypes.includes(meal.meal_type);

    return textMatch && dietMatch && mealTypeMatch;
  });

  renderMeals(filtered);
}

document.getElementById("search-input").addEventListener("input", applyFilters);
document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") applyFilters();
});
document
  .querySelectorAll('input[name="diet-filter"], input[name="meal-type-filter"]')
  .forEach((cb) => cb.addEventListener("change", applyFilters));

renderMeals(meals);

// Save meal to localStorage queue when "Add to Meal Plan" is clicked
document.querySelector(".recipes-container").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-button");
  if (!btn) return;

  const mealId = btn.dataset.mealId;
  const meal = meals.find((m) => m.meal_id === mealId);
  if (!meal) return;

  const queue = JSON.parse(localStorage.getItem("selectedMeals") || "[]");
  queue.push({ ...meal, queue_id: `${Date.now()}-${Math.random()}` });
  localStorage.setItem("selectedMeals", JSON.stringify(queue));

  btn.textContent = "Added!";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Add to Meal Plan";
    btn.disabled = false;
  }, 1500);
});

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  try {
    const userDoc = await db.collection("user_accounts").doc(user.uid).get();
    if (userDoc.exists && userDoc.data().isAdmin === true) {
      window.location.href = "admin.html";
    }
  } catch (error) {
    console.error("Error checking user role:", error);
  }
});
