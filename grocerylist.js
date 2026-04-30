let unsubscribeGrocery = null;
let currentCheckedState = {};

// ── Build list from localStorage mealPlan ─────────────────────────

function buildLocalItems() {
  const plan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
  const ingredientMap = {};

  Object.values(plan).forEach((meal) => {
    if (!Array.isArray(meal.grocery_item)) return;
    meal.grocery_item.forEach((item) => {
      const key = item.trim().toLowerCase();
      if (!key) return;
      if (ingredientMap[key]) {
        ingredientMap[key].count += 1;
      } else {
        ingredientMap[key] = { display: item.trim(), count: 1 };
      }
    });
  });

  return Object.entries(ingredientMap).map(([key, val]) => ({
    key,
    display: val.display,
    count: val.count,
    checked: currentCheckedState[key] || false,
  }));
}

// ── Render ─────────────────────────────────────────────────────────

function renderGroceryList(items, uid) {
  const container = document.getElementById('groceryListContainer');
  container.innerHTML = '';

  if (!items || items.length === 0) {
    container.innerHTML = `
      <p class="empty-grocery">
        Your grocery list is empty. Add meals to your
        <a class="empty-link" href="meal-plans.html">Meal Plan</a> to get started.
      </p>`;
    return;
  }

  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'grocery-item-row';

    const checkWrap = document.createElement('label');
    checkWrap.className = 'grocery-checkbox-wrap';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'grocery-checkbox';
    checkbox.checked = item.checked || false;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'grocery-item-name' + (item.checked ? ' checked-text' : '');
    nameSpan.textContent = item.display;

    checkbox.addEventListener('change', () => {
      nameSpan.classList.toggle('checked-text', checkbox.checked);
      updateChecked(uid, item.key, checkbox.checked);
    });

    checkWrap.appendChild(checkbox);
    checkWrap.appendChild(nameSpan);

    if (item.count > 1) {
      const wrap = document.createElement('span');
      wrap.className = 'info-btn-wrap';

      const btn = document.createElement('button');
      btn.className = 'info-btn';
      btn.textContent = 'ℹ';
      btn.type = 'button';

      const tooltip = document.createElement('span');
      tooltip.className = 'info-tooltip';
      tooltip.textContent = `This item is in ${item.count} meals.`;

      wrap.appendChild(btn);
      wrap.appendChild(tooltip);
      checkWrap.appendChild(wrap);
    }

    row.appendChild(checkWrap);
    container.appendChild(row);
  });
}

// ── Persist checked state ──────────────────────────────────────────

function updateChecked(uid, key, checked) {
  currentCheckedState[key] = checked;
  localStorage.setItem('groceryChecked', JSON.stringify(currentCheckedState));

  // Also sync to Firebase when available
  db.collection('grocery_lists').doc(uid)
    .get()
    .then((snap) => {
      if (!snap.exists) return;
      const items = snap.data().items || [];
      const updated = items.map((i) => (i.key === key ? { ...i, checked } : i));
      snap.ref.set({ items: updated });
    })
    .catch(console.error);
}

// ── Auth & Init ────────────────────────────────────────────────────

document.querySelector('#logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => (window.location.href = 'login.html')).catch(console.error);
});

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  try {
    const doc = await db.collection('user_accounts').doc(user.uid).get();
    if (doc.exists && doc.data().isAdmin === true) {
      window.location.href = 'admin.html';
      return;
    }
  } catch (err) {
    console.error('Error checking user role:', err);
  }

  const uid = user.uid;

  // Load checked states from localStorage immediately (always works)
  currentCheckedState = JSON.parse(localStorage.getItem('groceryChecked') || '{}');

  // Render the list right away from localStorage meal plan
  renderGroceryList(buildLocalItems(), uid);

  // Try Firebase for real-time checked-state sync
  if (unsubscribeGrocery) unsubscribeGrocery();
  unsubscribeGrocery = db.collection('grocery_lists').doc(uid)
    .onSnapshot(
      (snap) => {
        if (snap.exists) {
          (snap.data().items || []).forEach((i) => {
            currentCheckedState[i.key] = i.checked || false;
          });
          localStorage.setItem('groceryChecked', JSON.stringify(currentCheckedState));
        }
        // Re-render with updated checked states; item list still from localStorage
        renderGroceryList(buildLocalItems(), uid);
      },
      (err) => {
        console.error('Firebase grocery sync unavailable:', err);
        // List is already rendered from localStorage — no action needed
      }
    );
});
