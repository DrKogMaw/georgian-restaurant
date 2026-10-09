import { restaurantData } from './data.js';

// Application State
const state = {
  activeCategory: 'all',
  searchQuery: '',
  activeTag: null,
  cart: [],
  selectedDish: null,
  lightboxImage: null,
  toastTimeout: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  setupEventListeners();
});

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Header / Navbar -->
    ${renderNavbar()}

    <!-- Hero Section -->
    ${renderHero()}

    <!-- Signature Dishes Highlights -->
    ${renderHighlights()}

    <!-- Interactive Menu Section -->
    ${renderMenuSection()}

    <!-- Georgian Qvevri Wine Cellar Showcase -->
    ${renderWineSection()}

    <!-- Ambiance & Restaurant Gallery -->
    ${renderGallerySection()}

    <!-- Our Story & Hospitality Heritage -->
    ${renderStorySection()}

    <!-- Customer Reviews & Testimonials -->
    ${renderReviewsSection()}

    <!-- Footer & Contact Details -->
    ${renderFooter()}

    <!-- Modals & Drawers -->
    <div id="modal-container"></div>
    <div id="drawer-container">${renderCartDrawer()}</div>
    <div id="toast-container" class="toast-container"></div>
  `;

  attachDynamicListeners();
}

/* ==========================================================================
   Component Templates
   ========================================================================== */

function renderNavbar() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  return `
    <nav class="navbar">
      <div class="container navbar-inner">
        <a href="#" class="brand-logo">
          <div class="brand-icon">🏺</div>
          <div>
            <div class="brand-name">${restaurantData.info.name}</div>
            <div class="brand-sub">${restaurantData.info.georgianName}</div>
          </div>
        </a>

        <ul class="nav-links">
          <li><a href="#menu" class="nav-link">Menu</a></li>
          <li><a href="#wine-cellar" class="nav-link">Qvevri Wine</a></li>
          <li><a href="#gallery" class="nav-link">Ambiance</a></li>
          <li><a href="#story" class="nav-link">Our Story</a></li>
          <li><a href="#reviews" class="nav-link">Reviews</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <button class="btn btn-primary" id="btn-open-reserve">
            <span>📅 Reserve Table</span>
          </button>
          <button class="cart-btn" id="btn-open-cart" aria-label="Shopping Cart">
            🛒
            ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
          </button>
        </div>
      </div>
    </nav>
  `;
}

function renderHero() {
  const { info } = restaurantData;
  return `
    <section class="hero">
      <img src="images/hero_bg.jpg" alt="Tbilisi Hearth Ambiance" class="hero-bg">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-badge">
          <span>✨</span>
          <span>${info.tagline}</span>
        </div>
        <h1 class="hero-title">
          Where Every Guest is a<br>
          <span>"Stumari Ghvtisaa"</span>
        </h1>
        <p class="hero-subtitle">${info.heroSubheadline}</p>
        
        <div class="hero-buttons">
          <a href="#menu" class="btn btn-primary">
            <span>🍽️ Explore Our Menu</span>
          </a>
          <button class="btn btn-gold" id="hero-btn-reserve">
            <span>🍷 Book a Table</span>
          </button>
        </div>

        <div class="hero-stats">
          ${info.stats.map(stat => `
            <div class="stat-item">
              <div class="stat-number">${stat.number}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHighlights() {
  const chefSpecials = restaurantData.menuItems.filter(item => item.tags.includes('Chef Special')).slice(0, 4);
  return `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Chef's Heritage Selections</span>
          <h2 class="section-title">Signature Georgian Delicacies</h2>
          <p class="section-subtitle">Crafted daily using traditional clay oven techniques and authentic Caucasus spices.</p>
        </div>

        <div class="highlights-grid">
          ${chefSpecials.map(item => renderDishCard(item, true)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMenuSection() {
  const filteredItems = getFilteredMenuItems();

  return `
    <section id="menu" class="section" style="background-color: var(--color-surface-offset);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Authentic Recipes</span>
          <h2 class="section-title">Explore Our Full Menu</h2>
          <p class="section-subtitle">Click on any dish to discover its origin story, ingredients, and traditional preparation method.</p>
        </div>

        <div class="menu-controls">
          <!-- Category Tabs -->
          <div class="category-tabs">
            ${restaurantData.categories.map(cat => `
              <button 
                class="tab-btn ${state.activeCategory === cat.id ? 'active' : ''}" 
                data-category="${cat.id}"
              >
                ${cat.name} (${cat.nameGe})
              </button>
            `).join('')}
          </div>

          <!-- Search & Tag Filters -->
          <div class="filter-bar">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                class="search-input" 
                id="search-menu"
                placeholder="Search dishes by name, ingredients, or Georgian title..." 
                value="${state.searchQuery}"
              >
            </div>

            <div class="tag-filters">
              <button class="tag-btn ${state.activeTag === null ? 'active' : ''}" data-tag="all">All Tags</button>
              ${restaurantData.dietaryTags.map(tag => `
                <button class="tag-btn ${state.activeTag === tag ? 'active' : ''}" data-tag="${tag}">${tag}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Menu Grid -->
        ${filteredItems.length === 0 ? `
          <div style="text-align: center; padding: 4rem 1rem;">
            <p style="font-size: 1.2rem; color: var(--color-text-muted);">No dishes match your current search or filter selection.</p>
            <button class="btn btn-secondary" id="btn-reset-filter" style="margin-top: 1rem;">Reset Filters</button>
          </div>
        ` : `
          <div class="highlights-grid">
            ${filteredItems.map(item => renderDishCard(item)).join('')}
          </div>
        `}
      </div>
    </section>
  `;
}

function renderDishCard(item, isHighlight = false) {
  return `
    <div class="highlight-card" data-dish-id="${item.id}">
      <div class="card-img-wrapper" onclick="window.appOpenDishModal('${item.id}')" style="cursor: pointer;">
        <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
        ${item.tags.length > 0 ? `<span class="card-tag">${item.tags[0]}</span>` : ''}
      </div>
      
      <div class="card-body">
        <div class="card-header">
          <div>
            <h3 class="card-title" onclick="window.appOpenDishModal('${item.id}')" style="cursor: pointer;">${item.name}</h3>
            <div class="card-georgian-name">${item.nameGe}</div>
          </div>
          <div class="card-price">₾${item.price.toFixed(2)}</div>
        </div>

        <p class="card-desc">${item.description}</p>

        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${item.spicy > 0 ? `<span style="font-size: 0.8rem; background: #FFF0F0; color: #D32F2F; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">${'🌶️'.repeat(item.spicy)} Spicy</span>` : ''}
          <span style="font-size: 0.8rem; background: #F0F4F8; color: #455A64; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">⏱️ ${item.prepTime}</span>
        </div>

        <div class="card-footer">
          <button class="btn btn-secondary" onclick="window.appOpenDishModal('${item.id}')" style="padding: 0.5rem 0.9rem; font-size: 0.85rem;">
            Details & Story
          </button>
          <button class="btn btn-primary" onclick="window.appAddToCart('${item.id}')" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
            + Add to Order
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderWineSection() {
  const wineItem = restaurantData.menuItems.find(i => i.id === 'wine-saperavi-qvevri');
  return `
    <section id="wine-cellar" class="section">
      <div class="container">
        <div class="wine-banner">
          <div>
            <span class="section-tag" style="background: rgba(212, 175, 55, 0.2); color: var(--color-gold); border-color: var(--color-gold);">
              UNESCO Cultural Heritage
            </span>
            <h2 class="wine-title">Ancient Qvevri <span>Winemaking</span></h2>
            <p style="color: rgba(255,255,255,0.85); font-size: 1.05rem; margin-bottom: 1.5rem; line-height: 1.8;">
              Georgia is the birthplace of wine, with unbroken winemaking traditions spanning over 8,000 years. 
              Our natural wines are aged in egg-shaped clay Qvevri vessels buried underground in our historic cellar.
            </p>

            <div style="background: rgba(255,255,255,0.08); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem; border-left: 3px solid var(--color-gold);">
              <h4 style="color: var(--color-gold); font-size: 1.1rem; margin-bottom: 0.4rem;">${wineItem.name} (${wineItem.nameGe})</h4>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">${wineItem.description}</p>
            </div>

            <button class="btn btn-gold" onclick="window.appAddToCart('${wineItem.id}')">
              🍷 Order Qvevri Saperavi Bottle (₾${wineItem.price.toFixed(2)})
            </button>
          </div>

          <div>
            <img src="images/saperavi_wine.jpg" alt="Georgian Qvevri Saperavi Wine" class="wine-banner-img">
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderGallerySection() {
  return `
    <section id="gallery" class="section" style="background-color: var(--color-surface-offset);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Atmosphere & Place</span>
          <h2 class="section-title">Experience Our Hearth</h2>
          <p class="section-subtitle">Take a visual tour of our subterranean wine cellar, main fireplace hall, and outdoor terrace.</p>
        </div>

        <div class="gallery-grid">
          ${restaurantData.ambianceGallery.map(item => `
            <div class="gallery-item" onclick="window.appOpenLightbox('${item.image}', '${item.title}')">
              <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
              <div class="gallery-overlay">
                <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-gold);">${item.category}</span>
                <div class="gallery-title">${item.title} (${item.titleGe})</div>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderStorySection() {
  return `
    <section id="story" class="section">
      <div class="container">
        <div class="story-grid">
          <div>
            <img src="images/place_main_hall.jpg" alt="Traditional Georgian Supra" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
          </div>
          <div class="story-text">
            <span class="section-tag">Our Culinary Philosophy</span>
            <h2 class="section-title">The Spirit of the Georgian Supra</h2>
            <p>
              In Georgia, a meal is never just food—it is a ceremony of life, brotherhood, and poetry known as a <strong>Supra</strong>. 
              Led by the <em>Tamada</em> (toastmaster), the table becomes a sacred space where guests are treated as honored blessings.
            </p>

            <div class="story-quote">
              " Every guest who crosses our threshold is sent by God. Our hearth exists to nourish your body and warm your soul. "
            </div>

            <p>
              At <strong>Tbilisi Hearth</strong>, we prepare every dish with organic heritage ingredients sourced from small Georgian farmsteads. 
              Our breads are slapped against the blazing walls of our traditional clay <em>Tone</em> oven, bringing ancient aromas straight to your table.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderReviewsSection() {
  return `
    <section id="reviews" class="section" style="background-color: var(--color-surface-offset);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Guest Experiences</span>
          <h2 class="section-title">Words From Our Diners</h2>
          <p class="section-subtitle">Discover why food critics and travelers rank us as Tbilisi's top authentic hearth dining destination.</p>
        </div>

        <div class="reviews-grid">
          ${restaurantData.reviews.map(rev => `
            <div class="review-card">
              <div>
                <div class="stars">${'★'.repeat(rev.rating)}</div>
                <p class="review-text">"${rev.comment}"</p>
              </div>
              <div>
                <div class="review-author">${rev.author}</div>
                <div class="review-role">${rev.role} • ${rev.date}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 3rem;">
          <button class="btn btn-secondary" id="btn-open-review-modal">✍️ Share Your Dining Experience</button>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  const { info } = restaurantData;
  return `
    <footer id="contact" class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand-logo" style="margin-bottom: 1rem;">
              <div class="brand-icon">🏺</div>
              <div>
                <div class="brand-name" style="color: #fff;">${info.name}</div>
                <div class="brand-sub">${info.georgianName}</div>
              </div>
            </div>
            <p>${info.heroSubheadline}</p>
            <div class="dev-banner">
              💻 <strong>Developer Customization Mode:</strong><br>
              All menu items, photos, ratings, and restaurant details can be modified in <code>js/data.js</code>.
            </div>
          </div>

          <div>
            <h4 class="footer-title">Quick Navigation</h4>
            <ul class="footer-links">
              <li><a href="#menu" class="footer-link">Menu Specialties</a></li>
              <li><a href="#wine-cellar" class="footer-link">Qvevri Wine Cellar</a></li>
              <li><a href="#gallery" class="footer-link">Venue Ambiance</a></li>
              <li><a href="#story" class="footer-link">Our Heritage</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-title">Operating Hours</h4>
            <ul class="footer-links">
              <li><strong>Mon - Thu:</strong><br>12:00 PM - 11:30 PM</li>
              <li style="margin-top: 0.5rem;"><strong>Fri - Sun:</strong><br>11:00 AM - 01:00 AM</li>
            </ul>
          </div>

          <div>
            <h4 class="footer-title">Location & Contact</h4>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">📍 ${info.address}</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">📞 ${info.phone}</p>
            <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">✉️ ${info.email}</p>
            <button class="btn btn-primary" id="footer-btn-reserve" style="width: 100%;">
              📅 Reserve Your Table
            </button>
          </div>
        </div>

        <div style="text-align: center; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; color: rgba(255,255,255,0.5);">
          © 2026 Tbilisi Hearth (თბილისური კერა). All Rights Reserved. Built with modern web standards.
        </div>
      </div>
    </footer>
  `;
}

function renderCartDrawer() {
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return `
    <div class="drawer" id="cart-drawer">
      <div class="drawer-header">
        <h3 style="font-size: 1.2rem; font-weight: 700;">Your Order Cart (${cartCount})</h3>
        <button class="modal-close" onclick="window.appCloseCart()">✕</button>
      </div>

      <div class="drawer-body">
        ${state.cart.length === 0 ? `
          <div style="text-align: center; padding: 4rem 1rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🥟</div>
            <p style="font-size: 1.1rem; color: var(--color-text-muted);">Your order cart is empty.</p>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-top: 0.5rem;">Explore our menu and add your favorite Georgian dishes!</p>
          </div>
        ` : `
          ${state.cart.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₾${(item.price * item.quantity).toFixed(2)}</div>
                <div class="qty-controls">
                  <button class="qty-btn" onclick="window.appUpdateCartQty('${item.id}', -1)">-</button>
                  <span style="font-weight: 700; font-size: 0.9rem; padding: 0 0.4rem;">${item.quantity}</span>
                  <button class="qty-btn" onclick="window.appUpdateCartQty('${item.id}', 1)">+</button>
                  <button style="margin-left: auto; color: #D32F2F; font-size: 0.8rem;" onclick="window.appRemoveFromCart('${item.id}')">Remove</button>
                </div>
              </div>
            </div>
          `).join('')}
        `}
      </div>

      ${state.cart.length > 0 ? `
        <div class="drawer-footer">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">
            <span>Total Amount:</span>
            <span style="color: var(--color-terracotta);">₾${total.toFixed(2)}</span>
          </div>

          <div style="margin-bottom: 1rem;">
            <label class="form-label">Order Type:</label>
            <select class="form-select" id="cart-order-type">
              <option value="dine-in">Pre-order for Table Dining</option>
              <option value="takeout">Takeout / Pickup</option>
              <option value="delivery">Tbilisi Express Delivery</option>
            </select>
          </div>

          <button class="btn btn-primary" style="width: 100%;" onclick="window.appSubmitOrder()">
            🚀 Submit Order (₾${total.toFixed(2)})
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

/* ==========================================================================
   Helper Functions & State Logic
   ========================================================================== */

function getFilteredMenuItems() {
  return restaurantData.menuItems.filter(item => {
    // Category match
    const matchesCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
    
    // Tag match
    const matchesTag = !state.activeTag || state.activeTag === 'all' || item.tags.includes(state.activeTag);

    // Search query match
    const query = state.searchQuery.toLowerCase();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.nameGe.includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(query));

    return matchesCategory && matchesTag && matchesSearch;
  });
}

/* Global Actions Exposed for Inline Event Triggers */
window.appAddToCart = function(dishId) {
  const item = restaurantData.menuItems.find(i => i.id === dishId);
  if (!item) return;

  const existing = state.cart.find(i => i.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  showToast(`Added ${item.name} to your order cart! 🥟`);
  renderApp();
  window.appOpenCart();
};

window.appUpdateCartQty = function(dishId, delta) {
  const item = state.cart.find(i => i.id === dishId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== dishId);
  }
  renderApp();
  window.appOpenCart();
};

window.appRemoveFromCart = function(dishId) {
  state.cart = state.cart.filter(i => i.id !== dishId);
  renderApp();
  window.appOpenCart();
};

window.appOpenCart = function() {
  document.getElementById('cart-drawer')?.classList.add('active');
};

window.appCloseCart = function() {
  document.getElementById('cart-drawer')?.classList.remove('active');
};

window.appOpenDishModal = function(dishId) {
  const dish = restaurantData.menuItems.find(i => i.id === dishId);
  if (!dish) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-backdrop active" id="dish-modal">
      <div class="modal-card">
        <button class="modal-close" onclick="window.appCloseModal('dish-modal')">✕</button>
        
        <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <div>
            <h2 style="font-size: 1.8rem; color: var(--color-wine-dark);">${dish.name}</h2>
            <div style="font-family: var(--font-georgian); color: var(--color-terracotta); font-size: 1.1rem;">${dish.nameGe}</div>
          </div>
          <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--color-terracotta);">₾${dish.price.toFixed(2)}</div>
        </div>

        <p style="margin-bottom: 1.25rem; font-size: 1rem; color: var(--color-dark-muted);">${dish.description}</p>

        <div style="background: var(--color-surface-offset); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.4rem; color: var(--color-wine-dark);">📖 Origin & Traditions</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-muted);">${dish.history}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-wine-dark);">Key Ingredients</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${dish.ingredients.map(ing => `
              <span style="background: var(--color-surface-offset); padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600;">${ing}</span>
            `).join('')}
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%;" onclick="window.appAddToCart('${dish.id}'); window.appCloseModal('dish-modal');">
          + Add to Order (₾${dish.price.toFixed(2)})
        </button>
      </div>
    </div>
  `;
};

window.appOpenReservationModal = function() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-backdrop active" id="reserve-modal">
      <div class="modal-card">
        <button class="modal-close" onclick="window.appCloseModal('reserve-modal')">✕</button>
        
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span class="section-tag">Tbilisi Hearth Table Booking</span>
          <h2 style="font-size: 1.8rem; color: var(--color-wine-dark);">Reserve Your Table</h2>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">Join us for an unforgettable Georgian Supra feast.</p>
        </div>

        <form id="reservation-form" onsubmit="window.appSubmitReservation(event)">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" required value="${new Date().toISOString().split('T')[0]}">
            </div>

            <div class="form-group">
              <label class="form-label">Time</label>
              <select class="form-select" required>
                <option value="18:00">06:00 PM</option>
                <option value="19:00" selected>07:00 PM</option>
                <option value="20:00">08:00 PM</option>
                <option value="21:00">09:00 PM</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Number of Guests</label>
              <select class="form-select" required>
                <option value="2">2 People</option>
                <option value="4" selected>4 People</option>
                <option value="6">6 People (Family Supra)</option>
                <option value="8+">8+ People (Feast)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Preferred Atmosphere</label>
              <select class="form-select" required>
                ${restaurantData.seatingZones.map(zone => `
                  <option value="${zone.id}">${zone.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Your Full Name</label>
            <input type="text" class="form-input" placeholder="e.g. Alex Tavdgiridze" required>
          </div>

          <div class="form-group">
            <label class="form-label">Phone / WhatsApp</label>
            <input type="tel" class="form-input" placeholder="+995 555 123 456" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            🍷 Confirm Table Reservation
          </button>
        </form>
      </div>
    </div>
  `;
};

window.appSubmitReservation = function(event) {
  event.preventDefault();
  window.appCloseModal('reserve-modal');
  showToast('🍷 Table Reserved! We look forward to welcoming you to Tbilisi Hearth.');
};

window.appOpenLightbox = function(imageUrl, title) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-backdrop active" id="lightbox-modal" onclick="window.appCloseModal('lightbox-modal')">
      <div style="max-width: 90vw; max-height: 90vh; position: relative;" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="window.appCloseModal('lightbox-modal')" style="background: rgba(0,0,0,0.6); color: #fff;">✕</button>
        <img src="${imageUrl}" alt="${title}" style="max-width: 100%; max-height: 80vh; border-radius: var(--radius-md); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; color: #fff; margin-top: 1rem; font-size: 1.2rem; font-weight: 700;">${title}</div>
      </div>
    </div>
  `;
};

window.appCloseModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
};

window.appSubmitOrder = function() {
  state.cart = [];
  window.appCloseCart();
  renderApp();
  showToast('🚀 Order Submitted Successfully! Our chef is preparing your meal.');
};

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   DOM Event Listeners
   ========================================================================== */

function setupEventListeners() {
  // Category tabs
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tab-btn');
    if (tabBtn) {
      state.activeCategory = tabBtn.dataset.category;
      renderApp();
      return;
    }

    const tagBtn = e.target.closest('.tag-btn');
    if (tagBtn) {
      state.activeTag = tagBtn.dataset.tag === 'all' ? null : tagBtn.dataset.tag;
      renderApp();
      return;
    }

    if (e.target.id === 'btn-reset-filter') {
      state.activeCategory = 'all';
      state.searchQuery = '';
      state.activeTag = null;
      renderApp();
      return;
    }

    if (e.target.id === 'btn-open-reserve' || e.target.id === 'hero-btn-reserve' || e.target.id === 'footer-btn-reserve') {
      window.appOpenReservationModal();
      return;
    }

    if (e.target.id === 'btn-open-cart' || e.target.closest('#btn-open-cart')) {
      window.appOpenCart();
      return;
    }
  });

  // Search input live filtering
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-menu') {
      state.searchQuery = e.target.value;
      const filteredGrid = document.querySelector('#menu .highlights-grid');
      if (filteredGrid) {
        filteredGrid.innerHTML = getFilteredMenuItems().map(item => renderDishCard(item)).join('');
      }
    }
  });
}

function attachDynamicListeners() {
  // Re-attach live search focus retention if user was typing
  const searchInput = document.getElementById('search-menu');
  if (searchInput && state.searchQuery) {
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }
}
