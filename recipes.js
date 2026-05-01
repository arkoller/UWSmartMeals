let allMeals = [];

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

  const filtered = allMeals.filter((meal) => {
    const textMatch =
      !query ||
      meal.meal_name.toLowerCase().includes(query) ||
      meal.description.toLowerCase().includes(query) ||
      (Array.isArray(meal.grocery_item) &&
        meal.grocery_item.some((item) => item.toLowerCase().includes(query)));

    const dietMatch =
      selectedDiets.length === 0 ||
      selectedDiets.every(
        (diet) => Array.isArray(meal.diet) && meal.diet.includes(diet)
      );

    const mealTypeMatch =
      selectedMealTypes.length === 0 ||
      (Array.isArray(meal.meal_type)
        ? meal.meal_type.some((t) => selectedMealTypes.includes(t))
        : selectedMealTypes.includes(meal.meal_type));

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

// Add to Meal Plan
document.querySelector(".recipes-container").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-button");
  if (!btn) return;

  const mealId = btn.dataset.mealId;
  const meal = allMeals.find((m) => m.meal_id === mealId);
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
      return;
    }
  } catch (error) {
    console.error("Error checking user role:", error);
  }

  // Load from the same Firebase collection admin uses — keeps both pages in sync
  db.collection("meal_ideas")
    .orderBy("meal_name")
    .onSnapshot(
      (snapshot) => {
        allMeals = snapshot.docs.map((doc) => ({
          meal_id: doc.id,
          ...doc.data(),
        }));
        applyFilters();
      },
      (err) => {
        console.error("Error loading meals:", err);
        // Likely a Firestore rules issue — meal_ideas must allow read for authenticated users
      }
    );
});
