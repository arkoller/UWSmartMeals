let unsubscribeGrocery = null;

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

    // Info button sits right after the name, inside the row
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

// ── Firebase write ─────────────────────────────────────────────────

function updateChecked(uid, key, checked) {
  const docRef = db.collection('grocery_lists').doc(uid);
  docRef.get().then((snap) => {
    if (!snap.exists) return;
    const items = snap.data().items || [];
    const updated = items.map((i) => i.key === key ? { ...i, checked } : i);
    docRef.set({ items: updated });
  }).catch(console.error);
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

  // Real-time listener on the user's grocery list
  if (unsubscribeGrocery) unsubscribeGrocery();
  unsubscribeGrocery = db.collection('grocery_lists').doc(user.uid)
    .onSnapshot((snap) => {
      const items = snap.exists ? (snap.data().items || []) : [];
      renderGroceryList(items, user.uid);
    }, console.error);
});
