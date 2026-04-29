const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

let draggedMeal = null;
let dragSource = null; // 'queue' | slot key string like '0-breakfast'

// ── Persistence ────────────────────────────────────────────────────

function getQueue() {
  return JSON.parse(localStorage.getItem('selectedMeals') || '[]');
}
function setQueue(arr) {
  localStorage.setItem('selectedMeals', JSON.stringify(arr));
}
function getPlan() {
  return JSON.parse(localStorage.getItem('mealPlan') || '{}');
}
function setPlan(obj) {
  localStorage.setItem('mealPlan', JSON.stringify(obj));
}

// ── Queue ──────────────────────────────────────────────────────────

function renderQueue() {
  const queue = getQueue();
  const container = document.getElementById('mealQueue');
  container.innerHTML = '';

  if (queue.length === 0) {
    container.innerHTML =
      '<p class="queue-empty">No meals added yet. Visit <a href="recipes.html">Meals</a> to add some.</p>';
    return;
  }

  queue.forEach((meal) => container.appendChild(buildQueueCard(meal)));
}

function buildQueueCard(meal) {
  const card = document.createElement('div');
  card.className = 'queue-card';
  card.draggable = true;
  card.innerHTML = `
    <button class="remove-queue-btn" title="Remove">×</button>
    <div class="queue-card-name">${meal.meal_name}</div>
    ${meal.meal_type ? `<div class="queue-card-type">${meal.meal_type}</div>` : ''}
  `;

  card.querySelector('.remove-queue-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    setQueue(getQueue().filter((m) => m.meal_id !== meal.meal_id));
    renderQueue();
  });

  card.addEventListener('dragstart', (e) => {
    draggedMeal = meal;
    dragSource = 'queue';
    e.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));

  return card;
}

function setupQueueDrop() {
  const q = document.getElementById('mealQueue');

  q.addEventListener('dragover', (e) => {
    if (dragSource && dragSource !== 'queue') {
      e.preventDefault();
      q.classList.add('queue-drag-over');
    }
  });
  q.addEventListener('dragleave', (e) => {
    if (!q.contains(e.relatedTarget)) q.classList.remove('queue-drag-over');
  });
  q.addEventListener('drop', (e) => {
    e.preventDefault();
    q.classList.remove('queue-drag-over');
    if (!draggedMeal || dragSource === 'queue') return;

    // Remove meal from its grid slot
    const plan = getPlan();
    delete plan[dragSource];
    setPlan(plan);

    // Add back to queue if not already present
    const queue = getQueue();
    if (!queue.find((m) => m.meal_id === draggedMeal.meal_id)) {
      queue.push(draggedMeal);
      setQueue(queue);
    }

    draggedMeal = null;
    dragSource = null;
    renderQueue();
    renderPlan();
  });
}

// ── Plan Grid ──────────────────────────────────────────────────────

function buildGrid() {
  const grid = document.getElementById('planGrid');
  grid.innerHTML = '';

  // Corner placeholder
  const corner = document.createElement('div');
  corner.className = 'plan-corner';
  grid.appendChild(corner);

  // Day header cells
  DAYS.forEach((day) => {
    const h = document.createElement('div');
    h.className = 'plan-day-header';
    h.textContent = day;
    grid.appendChild(h);
  });

  // One row per meal type
  MEAL_TYPES.forEach((type) => {
    const label = document.createElement('div');
    label.className = 'plan-meal-label';
    label.textContent = type;
    grid.appendChild(label);

    DAYS.forEach((_, dayIdx) => {
      const key = `${dayIdx}-${type.toLowerCase()}`;
      const cell = document.createElement('div');
      cell.className = 'drop-zone';
      cell.dataset.key = key;
      setupDropZone(cell, key);
      grid.appendChild(cell);
    });
  });

  setupQueueDrop();
  renderPlan();
}

function setupDropZone(cell, key) {
  cell.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    cell.classList.add('drag-over');
  });
  cell.addEventListener('dragleave', (e) => {
    if (!cell.contains(e.relatedTarget)) cell.classList.remove('drag-over');
  });
  cell.addEventListener('drop', (e) => {
    e.preventDefault();
    cell.classList.remove('drag-over');
    if (!draggedMeal) return;

    const plan = getPlan();

    // Clear the source slot if dragging from another grid cell
    if (dragSource !== 'queue') delete plan[dragSource];

    // If the target already has a meal, displace it back to the queue
    if (plan[key]) {
      const displaced = plan[key];
      const queue = getQueue();
      if (!queue.find((m) => m.meal_id === displaced.meal_id)) {
        queue.push(displaced);
        setQueue(queue);
      }
    }

    // Place the dragged meal in this slot
    plan[key] = draggedMeal;
    setPlan(plan);

    // Remove from queue if it was dragged from there
    if (dragSource === 'queue') {
      setQueue(getQueue().filter((m) => m.meal_id !== draggedMeal.meal_id));
    }

    draggedMeal = null;
    dragSource = null;
    renderQueue();
    renderPlan();
  });
}

function renderPlan() {
  const plan = getPlan();

  document.querySelectorAll('.drop-zone').forEach((cell) => {
    const key = cell.dataset.key;
    const meal = plan[key];
    cell.innerHTML = '';

    if (meal) {
      const placed = document.createElement('div');
      placed.className = 'placed-meal';
      placed.draggable = true;
      placed.innerHTML = `
        <button class="remove-meal-btn" title="Remove">×</button>
        <span class="placed-meal-name">${meal.meal_name}</span>
      `;

      placed.addEventListener('dragstart', (e) => {
        draggedMeal = meal;
        dragSource = key;
        e.dataTransfer.effectAllowed = 'move';
        placed.classList.add('dragging');
      });
      placed.addEventListener('dragend', () => placed.classList.remove('dragging'));

      placed.querySelector('.remove-meal-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const plan = getPlan();
        const m = plan[key];
        if (!m) return;
        // Return to queue
        const queue = getQueue();
        if (!queue.find((q) => q.meal_id === m.meal_id)) {
          queue.push(m);
          setQueue(queue);
        }
        delete plan[key];
        setPlan(plan);
        renderQueue();
        renderPlan();
      });

      cell.appendChild(placed);
    } else {
      const hint = document.createElement('span');
      hint.className = 'drop-hint';
      hint.textContent = 'Drop here';
      cell.appendChild(hint);
    }
  });
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
  renderQueue();
  buildGrid();
});
