// Admin page logic for adding and deleting recipes from Firebase meal_ideas
const adminMessage = document.querySelector("#adminMessage");
const recipeForm = document.querySelector("#addRecipeForm");
const adminRecipesContainer = document.querySelector("#adminRecipesContainer");
const deleteModal = document.querySelector("#deleteModal");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");

let recipeToDeleteId = null;

function showMessage(message, isError = false) {
  adminMessage.textContent = message;
  adminMessage.style.color = isError ? "#b00020" : "#2e7d32";
}

function getCheckedValues(name) {
  return Array.from(
    document.querySelectorAll(`input[name="${name}"]:checked`),
  ).map((checkbox) => checkbox.value);
}

function getImageUrl(recipe) {
  return (
    recipe.image_url ||
    recipe.image_id ||
    recipe.image ||
    "Images/UWSmartMealsBckgrnd.webp"
  );
}

function formatIngredients(recipe) {
  if (Array.isArray(recipe.grocery_item) && recipe.grocery_item.length > 0) {
    return recipe.grocery_item.join(", ");
  }
  return "No ingredients listed";
}

function renderAdminRecipe(doc) {
  const recipe = { meal_id: doc.id, ...doc.data() };
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-item", "admin-recipe-item");

  recipeCard.innerHTML = `
    <button class="delete-recipe-button" data-id="${recipe.meal_id}">×</button>
    <img
      src="${getImageUrl(recipe)}"
      alt="${recipe.meal_name || "Recipe image"}"
      class="recipe-image"
      onerror="this.src='Images/UWSmartMealsBckgrnd.webp'"
    />
    <div class="recipe-details">
      <span class="recipe-text">${recipe.meal_name || "Untitled Recipe"}</span>
      <div class="description-row">
        <div class="recipe-description">
          <strong>Ingredients:</strong> ${formatIngredients(recipe)}. ${recipe.description || ""}
        </div>
      </div>
    </div>
  `;

  adminRecipesContainer.appendChild(recipeCard);
}

function loadAdminRecipes() {
  db.collection("meal_ideas")
    .orderBy("meal_name")
    .onSnapshot(
      (snapshot) => {
        adminRecipesContainer.innerHTML = "";

        if (snapshot.empty) {
          adminRecipesContainer.innerHTML = `<p class="empty-message">No recipes have been added yet.</p>`;
          return;
        }

        snapshot.forEach(renderAdminRecipe);
      },
      (error) => {
        console.error("Error loading admin recipes:", error);
        adminRecipesContainer.innerHTML = `<p class="empty-message">There was an error loading recipes.</p>`;
      },
    );
}

function openDeleteModal(mealId) {
  recipeToDeleteId = mealId;
  deleteModal.classList.remove("hidden");
}

function closeDeleteModal() {
  recipeToDeleteId = null;
  deleteModal.classList.add("hidden");
}

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const userDoc = await db.collection("user_accounts").doc(user.uid).get();

    if (!userDoc.exists || userDoc.data().isAdmin !== true) {
      alert("You do not have permission to access the admin page.");
      window.location.href = "recipes.html";
      return;
    }

    loadAdminRecipes();
  } catch (error) {
    console.error("Error checking admin access:", error);
    alert("There was an error checking your admin access.");
    window.location.href = "recipes.html";
  }
});

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const mealName = document.querySelector("#mealName").value.trim();
  const description = document.querySelector("#description").value.trim();
  const groceryItems = document
    .querySelector("#groceryItems")
    .value.split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
  const imageUrl = document.querySelector("#imageUrl").value.trim();
  const mealTypes = getCheckedValues("mealType");
  const diets = getCheckedValues("diet");

  if (
    !mealName ||
    !description ||
    groceryItems.length === 0 ||
    !imageUrl ||
    mealTypes.length === 0 ||
    diets.length === 0
  ) {
    showMessage("Please fill out all fields before submitting.", true);
    return;
  }

  try {
    await db.collection("meal_ideas").add({
      meal_name: mealName,
      description: description,
      grocery_item: groceryItems,
      image_url: imageUrl,
      meal_type: mealTypes,
      diet: diets,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });

    recipeForm.reset();
    showMessage("Recipe added successfully!");
  } catch (error) {
    console.error("Error adding recipe:", error);
    showMessage("There was an error adding the recipe.", true);
  }
});

adminRecipesContainer.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-recipe-button");
  if (deleteButton) {
    openDeleteModal(deleteButton.dataset.id);
  }
});

confirmDeleteButton.addEventListener("click", async () => {
  if (!recipeToDeleteId) return;

  try {
    await db.collection("meal_ideas").doc(recipeToDeleteId).delete();
    closeDeleteModal();
    showMessage("Recipe deleted successfully.");
  } catch (error) {
    console.error("Error deleting recipe:", error);
    showMessage("There was an error deleting the recipe.", true);
  }
});

cancelDeleteButton.addEventListener("click", closeDeleteModal);

deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    closeDeleteModal();
  }
});
