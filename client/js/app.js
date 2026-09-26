/**
 * StockSense — Inventory Management System
 * Main client-side application (vanilla JS SPA with hash-based routing)
 */
import { signIn, signUp, firebaseToken } from './firebase.js';
import { mockApi, mockWrite } from './mock-data.js';

/* ─── Global State ─────────────────────────────────────────────── */
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
let useMockData = false; // auto-detected on first API call

const state = {
  token: localStorage.getItem('stocksense-token') || '',
  products: [],
  warehouses: [],
  locations: [],
};

/* ─── Icon Map (simple text glyphs) ────────────────────────────── */
const icons = {
  grid: '▦', box: '▣', truck: '↗', send: '↗', move: '⇄',
  sliders: '≡', history: '◷', warehouse: '⌂', plus: '+',
  search: '⌕', bell: '◉', menu: '☰', close: '×', warning: '⚠',
};

/* ─── Helpers ──────────────────────────────────────────────────── */

/** Create a DOM element */
function el(tag, attrs = {}, content = '') {
  const node = document.createElement(tag);
  Object.assign(node, attrs);
  if (content) node.innerHTML = content;
  return node;
}

/** Make an API request with auth header — auto-falls back to mock data */
function api(path, options = {}) {
  // If we already know the backend is down, use mock data directly
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (options.method === 'POST') {
          const body = options.body ? JSON.parse(options.body) : {};
          resolve(mockWrite(path, body));
        } else {
          resolve(mockApi(path));
        }
      }, 80); // small delay to feel realistic
    });
  }

  return fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    },
    ...options,
  }).then(async (r) => {
    const body = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(body.message || 'Request failed');
    return body.data;
  }).catch((err) => {
    // If fetch itself failed (network error / server down), switch to mock mode
    if (err.message === 'Failed to fetch' || err.message.includes('NetworkError') || err.name === 'TypeError') {
      console.warn('⚡ Backend API unavailable — switching to demo mode with mock data');
      useMockData = true;
      if (options.method === 'POST') {
        const body = options.body ? JSON.parse(options.body) : {};
        return mockWrite(path, body);
      }
      return mockApi(path);
    }
    throw err;
  });
}

/** Show a toast notification */
function toast(message) {
  const t = el('div', { className: 'toast' }, message);
  document.body.append(t);
  setTimeout(() => t.remove(), 3200);
}

/** Render a status badge */
function badge(status) {
  return `<span class="badge ${status}">${status}</span>`;
}

/** Format a number for display */
function format(n) {
  return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

/* ─── Layout Components ───────────────────────────────────────── */

function navItem(route, icon, label, active) {
  return `<a href="#/${route}" class="nav-item ${active ? 'active' : ''}">
    <span>${icons[icon]}</span>${label}
  </a>`;
}

function shell(page, content) {
  const route = location.hash.replace('#/', '') || 'dashboard';

  document.querySelector('#app').innerHTML = `
    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <span class="brand-mark">S</span>StockSense
        </div>

        <nav class="nav">
          <div class="nav-title">Workspace</div>
          ${navItem('dashboard', 'grid', 'Dashboard', route === 'dashboard')}

          <div class="nav-title">Products</div>
          ${navItem('products', 'box', 'Products', route === 'products')}
          ${navItem('categories', 'sliders', 'Categories', route === 'categories')}
          ${navItem('reordering', 'history', 'Reordering Rules', route === 'reordering')}

          <div class="nav-title">Operations</div>
          ${navItem('receipts', 'truck', 'Receipts', route === 'receipts')}
          ${navItem('deliveries', 'send', 'Delivery Orders', route === 'deliveries')}
          ${navItem('transfers', 'move', 'Internal Transfers', route === 'transfers')}
          ${navItem('adjustments', 'sliders', 'Inventory Adjustments', route === 'adjustments')}
          ${navItem('moves', 'history', 'Move History', route === 'moves')}

          <div class="nav-title">Settings</div>
          ${navItem('warehouses', 'warehouse', 'Warehouses', route === 'warehouses')}
        </nav>

        <div class="profile">
          <div class="profile-row">
            <div class="avatar">AM</div>
            <div>
              <div class="profile-name">Alex Morgan</div>
              <div class="profile-role">Inventory Manager</div>
            </div>
          </div>
          <div class="profile-links">
            <a href="#/profile">My profile</a>
            <a href="#/login" id="logout">Logout</a>
          </div>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="icon-btn hamburger" id="menu" aria-label="Open navigation">☰</button>
          <div class="crumb">StockSense <span> / </span> <b>${page}</b></div>
          <div class="topbar-actions">
            <input class="global-search" placeholder="Search products, SKU, documents…">
            <button class="icon-btn" aria-label="Notifications">${icons.bell}</button>
            <div class="avatar">AM</div>
          </div>
        </header>
        <section class="page">${content}</section>
      </main>
    </div>`;

  // Sidebar toggle for mobile
  document.querySelector('#menu')?.addEventListener('click', () =>
    document.querySelector('#sidebar').classList.toggle('open')
  );

  // Logout handler
  document.querySelector('#logout')?.addEventListener('click', () => {
    state.token = '';
    localStorage.removeItem('stocksense-token');
  });
}

function heading(title, subtitle, action = '') {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      ${action}
    </div>`;
}

function empty(text, detail) {
  return `
    <div class="empty">
      <div style="font-size:32px">▣</div>
      <strong>${text}</strong>
      <div>${detail || ''}</div>
    </div>`;
}

/* ─── Modal ────────────────────────────────────────────────────── */

function modal(title, body, onSave, label = 'Save') {
  const wrap = el('div', { className: 'modal-backdrop' }, `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="icon-btn" id="modal-close">×</button>
      </div>
      <form id="modal-form" class="form">${body}</form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button form="modal-form" class="btn btn-primary">${label}</button>
      </div>
    </div>`);

  document.body.append(wrap);

  const close = () => wrap.remove();
  wrap.querySelector('#modal-close').onclick = close;
  wrap.querySelector('#modal-cancel').onclick = close;

  wrap.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(new FormData(e.target));
      close();
    } catch (error) {
      toast(error.message);
    }
  };
}

/* ─── Dashboard ────────────────────────────────────────────────── */

async function dashboard() {
  shell('Inventory Dashboard',
    heading('Inventory Dashboard', 'A live snapshot of stock operations and replenishment needs.') + `
    <div class="filters">
      <select class="filter">
        <option>All document types</option>
        <option>Receipts</option>
        <option>Delivery</option>
        <option>Internal Transfer</option>
        <option>Adjustment</option>
      </select>
      <select class="filter">
        <option>All statuses</option>
        <option>Draft</option>
        <option>Waiting</option>
        <option>Ready</option>
        <option>Done</option>
      </select>
      <select class="filter"><option>All warehouses</option></select>
      <select class="filter"><option>All categories</option></select>
      <button class="btn btn-secondary">Clear filters</button>
    </div>
    <div id="dashboard-content">${empty('Loading dashboard', 'Fetching live inventory data…')}</div>`
  );

  try {
    const [summary, recent, alerts, categories] = await Promise.all(
      ['/dashboard/summary', '/dashboard/recent-operations', '/dashboard/stock-alerts', '/dashboard/stock-by-category']
        .map((p) => api(p))
    );

    const cards = [
      ['Total Products in Stock', summary.totalProducts,      'box',     'Products with on-hand stock',  ''],
      ['Low Stock Items',         summary.lowStock,            'warning', 'At or below reorder point',    'amber'],
      ['Out of Stock Items',      summary.outOfStock,          'warning', 'Requires attention',           'red'],
      ['Pending Receipts',        summary.pendingReceipts,     'truck',   'Awaiting validation',          'teal'],
      ['Pending Deliveries',      summary.pendingDeliveries,   'send',    'Awaiting dispatch',            ''],
      ['Transfers Scheduled',     summary.scheduledTransfers,  'move',    'Internal movements',           'teal'],
    ];

    document.querySelector('#dashboard-content').innerHTML = `
      <div class="kpis">
        ${cards.map(([t, v, i, n, c]) => `
          <article class="kpi">
            <div class="kpi-top">
              <span>${t}</span>
              <span class="kpi-icon ${c}">${icons[i]}</span>
            </div>
            <div class="kpi-value">${format(v)}</div>
            <div class="kpi-note">${n}</div>
          </article>`).join('')}
      </div>

      <div class="dashboard-grid">
        <!-- Recent Operations -->
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Recent Operations</h2>
            <a class="card-link" href="#/moves">View all activity</a>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr>
                <th>Document</th><th>Type</th><th>Warehouse</th><th>Status</th><th>Date</th>
              </tr></thead>
              <tbody>
                ${recent.length
                  ? recent.map((d) => `<tr>
                      <td class="reference">${d.document_number}</td>
                      <td>${d.document_type}</td>
                      <td>${d.warehouse || '—'}</td>
                      <td>${badge(d.status)}</td>
                      <td>${new Date(d.created_at).toLocaleDateString()}</td>
                    </tr>`).join('')
                  : `<tr><td colspan="5">${empty('No operations yet', 'Create a receipt or delivery to begin.')}</td></tr>`
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Stock Alerts -->
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Stock Alerts</h2>
            <a class="card-link" href="#/reordering">View rules</a>
          </div>
          <div class="alert-list">
            ${alerts.length
              ? alerts.map((a) => `
                <div class="alert">
                  <span class="alert-icon">${icons.warning}</span>
                  <div class="alert-text">
                    <div class="alert-title">${a.name}</div>
                    <div class="alert-note">${a.sku} · ${format(a.available)} available</div>
                  </div>
                  <span class="badge ${Number(a.available) <= 0 ? 'CANCELED' : 'WAITING'}">
                    ${Number(a.available) <= 0 ? 'OUT OF STOCK' : 'REORDER'}
                  </span>
                </div>`).join('')
              : empty('Stock levels look healthy', 'No low-stock alerts at this time.')
            }
          </div>
        </section>

        <!-- Charts -->
        <section class="card charts">
          <div class="card">
            <div class="card-header"><h2 class="card-title">Stock by Category</h2></div>
            <div class="chart-body">
              ${categories.map((c) => `
                <div class="bar-column">
                  <span>${format(c.value)}</span>
                  <div class="bar" style="height:${Math.max(5, Math.min(100, Number(c.value) * 8))}%"></div>
                  <span>${c.label}</span>
                </div>`).join('') || '<span class="muted">Inventory category distribution will appear here.</span>'}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h2 class="card-title">Movement Overview</h2></div>
            <div class="chart-body">
              <div class="bar-column"><span>Receipts</span><div class="bar" style="height:74%"></div><span>Incoming</span></div>
              <div class="bar-column"><span>Deliveries</span><div class="bar" style="height:49%;background:var(--primary)"></div><span>Outgoing</span></div>
              <div class="bar-column"><span>Transfers</span><div class="bar" style="height:30%;background:#d3e6e5"></div><span>Internal</span></div>
            </div>
          </div>
        </section>
      </div>`;
  } catch (e) {
    document.querySelector('#dashboard-content').innerHTML =
      empty('Could not load the dashboard', e.message);
  }
}

/* ─── Products ─────────────────────────────────────────────────── */

async function catalogue() {
  const categories = await api('/categories').catch(() => []);
  return `<option value="">Uncategorized</option>${categories.map(
    (c) => `<option value="${c.id}">${c.name}</option>`
  ).join('')}`;
}

async function productModal() {
  modal('New Product', `
    <div class="form-grid">
      <div class="field">
        <label>Product name <em>*</em></label>
        <input name="name" required placeholder="e.g. Steel Rods">
      </div>
      <div class="field">
        <label>SKU / Code <em>*</em></label>
        <input name="sku" required placeholder="e.g. STL-001">
      </div>
      <div class="field">
        <label>Category</label>
        <select name="categoryId" id="category-options"><option>Loading…</option></select>
      </div>
      <div class="field">
        <label>Unit of measure <em>*</em></label>
        <select name="uom">
          <option>units</option><option>kg</option><option>sheets</option><option>boxes</option>
        </select>
      </div>
      <div class="field">
        <label>Reorder point</label>
        <input name="reorderPoint" type="number" min="0" value="0">
      </div>
      <div class="field">
        <label>Reorder quantity</label>
        <input name="reorderQuantity" type="number" min="0" value="0">
      </div>
      <div class="field full">
        <label>Description</label>
        <textarea name="description" rows="2" placeholder="Optional product notes"></textarea>
      </div>
    </div>`,
    async (fd) => {
      await api('/products', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
      toast('Product created successfully.');
      products();
    }
  );
  document.querySelector('#category-options').innerHTML = await catalogue();
}

async function products() {
  shell('Products',
    heading('Products', 'Manage catalog items, availability, and replenishment settings.',
      `<button class="btn btn-primary" id="new-product">${icons.plus} New Product</button>`) + `
    <div class="toolbar">
      <input class="filter" id="product-search" placeholder="Search name or SKU">
      <select class="filter"><option>All categories</option></select>
      <select class="filter"><option>Active products</option></select>
    </div>
    <div class="card" id="product-table">${empty('Loading products')}</div>`
  );

  document.querySelector('#new-product').onclick = () => productModal();

  const load = async (search = '') => {
    try {
      state.products = await api('/products?search=' + encodeURIComponent(search));
      document.querySelector('#product-table').innerHTML = `
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Product</th><th>SKU</th><th>Category</th><th>UOM</th>
              <th>On Hand</th><th>Available</th><th>Reorder Point</th><th>Status</th>
            </tr></thead>
            <tbody>
              ${state.products.length
                ? state.products.map((p) => `<tr>
                    <td><a class="reference" href="#/products/${p.id}">${p.name}</a></td>
                    <td>${p.sku}</td>
                    <td>${p.category || '—'}</td>
                    <td>${p.uom}</td>
                    <td>${format(p.onHand)}</td>
                    <td>${format(p.available)}</td>
                    <td>${format(p.reorder_point)}</td>
                    <td>${Number(p.available) <= 0 ? badge('CANCELED')
                          : Number(p.available) <= Number(p.reorder_point) ? badge('WAITING')
                          : badge('DONE')}</td>
                  </tr>`).join('')
                : `<tr><td colspan="8">${empty('No products found', 'Create your first product to start tracking inventory.')}</td></tr>`
              }
            </tbody>
          </table>
        </div>`;
    } catch (e) {
      document.querySelector('#product-table').innerHTML = empty('Could not load products', e.message);
    }
  };

  let timer;
  document.querySelector('#product-search').oninput = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => load(e.target.value), 250);
  };
  load();
}

/* ─── Product Detail ───────────────────────────────────────────── */

async function productDetail(id) {
  shell('Product Details', `<div id="detail">${empty('Loading product')}</div>`);

  try {
    const p = await api('/products/' + id);
    const onHand   = p.balances.reduce((a, b) => a + Number(b.on_hand), 0);
    const reserved = p.balances.reduce((a, b) => a + Number(b.reserved), 0);

    document.querySelector('#detail').innerHTML =
      heading(p.name, `${p.sku} · ${p.category || 'Uncategorized'} · ${p.uom}`,
        `<a class="btn btn-secondary" href="#/products">Back to Products</a>`) + `

      <div class="kpis" style="grid-template-columns:repeat(4,1fr)">
        <article class="kpi">
          <div class="kpi-top">On Hand<span class="kpi-icon">▣</span></div>
          <div class="kpi-value">${format(onHand)}</div>
          <div class="kpi-note">Across all locations</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Available<span class="kpi-icon teal">✓</span></div>
          <div class="kpi-value">${format(onHand - reserved)}</div>
          <div class="kpi-note">Ready to allocate</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Reserved<span class="kpi-icon amber">◷</span></div>
          <div class="kpi-value">${format(reserved)}</div>
          <div class="kpi-note">Committed to deliveries</div>
        </article>
        <article class="kpi">
          <div class="kpi-top">Reorder Point<span class="kpi-icon">↺</span></div>
          <div class="kpi-value">${format(p.reorder_point)}</div>
          <div class="kpi-note">Alert threshold</div>
        </article>
      </div>

      <section class="card">
        <div class="card-header"><h2 class="card-title">Location Availability</h2></div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Warehouse</th><th>Location</th><th>On Hand</th><th>Reserved</th><th>Available</th>
            </tr></thead>
            <tbody>
              ${p.balances.length
                ? p.balances.map((b) => `<tr>
                    <td>${b.warehouse}</td>
                    <td>${b.location}</td>
                    <td>${format(b.on_hand)}</td>
                    <td>${format(b.reserved)}</td>
                    <td>${format(b.available)}</td>
                  </tr>`).join('')
                : `<tr><td colspan="5">${empty('No stock recorded yet')}</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </section>`;
  } catch (e) {
    document.querySelector('#detail').innerHTML = empty('Could not load product', e.message);
  }
}

/* ─── Categories ───────────────────────────────────────────────── */

async function categories() {
  shell('Product Categories',
    heading('Product Categories', 'Organize products for filtering and reporting.',
      `<button class="btn btn-primary" id="new-category">${icons.plus} New Category</button>`) + `
    <div class="card" id="category-table">${empty('Loading categories')}</div>`
  );

  document.querySelector('#new-category').onclick = () =>
    modal('New Category', `
      <div class="field">
        <label>Category name <em>*</em></label>
        <input name="name" required>
      </div>
      <div class="field" style="margin-top:14px">
        <label>Description</label>
        <textarea name="description" rows="3"></textarea>
      </div>`,
      async (fd) => {
        await api('/categories', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
        toast('Category created.');
        categories();
      }
    );

  try {
    const rows = await api('/categories');
    document.querySelector('#category-table').innerHTML = `
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Category</th><th>Description</th><th>Products</th><th>Status</th></tr></thead>
          <tbody>
            ${rows.length
              ? rows.map((c) => `<tr>
                  <td class="reference">${c.name}</td>
                  <td>${c.description || '—'}</td>
                  <td>${c.productCount}</td>
                  <td>${badge('DONE')}</td>
                </tr>`).join('')
              : `<tr><td colspan="4">${empty('No categories found')}</td></tr>`
            }
          </tbody>
        </table>
      </div>`;
  } catch (e) {
    document.querySelector('#category-table').innerHTML = empty('Could not load categories', e.message);
  }
}

/* ─── Warehouses ───────────────────────────────────────────────── */

async function warehouses() {
  shell('Warehouses',
    heading('Warehouses', 'Configure stock facilities and their storage locations.',
      `<button class="btn btn-primary" id="new-warehouse">${icons.plus} New Warehouse</button>`) + `
    <div class="dashboard-grid">
      <div class="card" id="warehouse-table">${empty('Loading warehouses')}</div>
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Locations</h2>
          <button class="btn btn-secondary" id="new-location">${icons.plus} Add Location</button>
        </div>
        <div id="location-list">${empty('Select a warehouse')}</div>
      </div>
    </div>`
  );

  const [ws, ls] = await Promise.all([
    api('/warehouses').catch(() => []),
    api('/locations').catch(() => []),
  ]);
  state.warehouses = ws;
  state.locations = ls;

  // Warehouse table
  document.querySelector('#warehouse-table').innerHTML = `
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Warehouse</th><th>Code</th><th>Address</th><th>Status</th></tr></thead>
        <tbody>
          ${ws.length
            ? ws.map((w) => `<tr>
                <td class="reference">${w.name}</td>
                <td>${w.code}</td>
                <td>${w.address || '—'}</td>
                <td>${badge('DONE')}</td>
              </tr>`).join('')
            : `<tr><td colspan="4">${empty('No warehouses configured')}</td></tr>`
          }
        </tbody>
      </table>
    </div>`;

  // Location list
  document.querySelector('#location-list').innerHTML = ls.length
    ? `<div class="alert-list">${ls.map((l) => `
        <div class="alert">
          <span class="alert-icon">⌂</span>
          <div class="alert-text">
            <div class="alert-title">${l.name}</div>
            <div class="alert-note">${l.warehouse} · ${l.code} · ${l.location_type}</div>
          </div>
        </div>`).join('')}</div>`
    : empty('No locations configured');

  // New warehouse modal
  document.querySelector('#new-warehouse').onclick = () =>
    modal('New Warehouse', `
      <div class="form-grid">
        <div class="field"><label>Name <em>*</em></label><input name="name" required></div>
        <div class="field"><label>Code <em>*</em></label><input name="code" required placeholder="MW"></div>
        <div class="field full"><label>Address</label><textarea name="address" rows="2"></textarea></div>
      </div>`,
      async (fd) => {
        await api('/warehouses', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
        toast('Warehouse created.');
        warehouses();
      }
    );

  // New location modal
  document.querySelector('#new-location').onclick = () =>
    modal('New Location', `
      <div class="form-grid">
        <div class="field">
          <label>Warehouse <em>*</em></label>
          <select name="warehouseId">${ws.map((w) => `<option value="${w.id}">${w.name}</option>`).join('')}</select>
        </div>
        <div class="field"><label>Location name <em>*</em></label><input name="name" required></div>
        <div class="field"><label>Code <em>*</em></label><input name="code" required></div>
        <div class="field">
          <label>Location type</label>
          <select name="locationType">
            <option>INTERNAL</option><option>RECEIVING</option><option>DISPATCH</option><option>SCRAP</option>
          </select>
        </div>
      </div>`,
      async (fd) => {
        await api('/locations', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
        toast('Location created.');
        warehouses();
      }
    );
}

/* ─── Operations (Receipts / Deliveries / Transfers) ───────────── */

const operationInfo = {
  receipts:   { title: 'Receipts',           subtitle: 'Incoming goods from vendors and suppliers.',        button: 'New Receipt',  type: 'RECEIPT' },
  deliveries: { title: 'Delivery Orders',    subtitle: 'Pick, pack, and validate customer shipments.',     button: 'New Delivery', type: 'DELIVERY' },
  transfers:  { title: 'Internal Transfers', subtitle: 'Move stock between warehouses and locations.',     button: 'New Transfer', type: 'TRANSFER' },
};

async function operationModal(kind) {
  const [prods, whs, locs] = await Promise.all([
    api('/products').catch(() => []),
    api('/warehouses').catch(() => []),
    api('/locations').catch(() => []),
  ]);
  const info = operationInfo[kind];

  const locSelect = (field) => `
    <select name="${field}">
      ${locs.map((l) => `<option value="${l.id}" data-w="${l.warehouse_id}">${l.warehouse} — ${l.name}</option>`).join('')}
    </select>`;

  const whSelect = (field) => `
    <select name="${field}">
      ${whs.map((w) => `<option value="${w.id}">${w.name}</option>`).join('')}
    </select>`;

  const source = kind !== 'receipts' ? `
    <div class="field"><label>Source warehouse <em>*</em></label>${whSelect('sourceWarehouseId')}</div>
    <div class="field"><label>Source location <em>*</em></label>${locSelect('sourceLocationId')}</div>` : '';

  const dest = kind !== 'deliveries' ? `
    <div class="field"><label>Destination warehouse <em>*</em></label>${whSelect('destinationWarehouseId')}</div>
    <div class="field"><label>Destination location <em>*</em></label>${locSelect('destinationLocationId')}</div>` : '';

  const partnerLabel = kind === 'receipts' ? 'Supplier'
    : kind === 'deliveries' ? 'Customer'
    : 'Transfer reference';

  modal(info.button, `
    <div class="form-grid">
      <div class="field">
        <label>${partnerLabel} <em>*</em></label>
        <input name="partnerName" required placeholder="${kind === 'transfers' ? 'Internal stock movement' : 'Company name'}">
      </div>
      <div class="field">
        <label>Scheduled date</label>
        <input name="scheduledDate" type="date">
      </div>
      ${source}${dest}
      <div class="field">
        <label>Status</label>
        <select name="status"><option>DRAFT</option><option>WAITING</option><option>READY</option></select>
      </div>
      <div class="field">
        <label>Notes</label>
        <input name="notes" placeholder="Optional note">
      </div>
    </div>
    <div class="operation-lines">
      <strong>Products to process</strong>
      <div class="line-grid">
        <select name="productId">
          ${prods.map((p) => `<option value="${p.id}" data-uom="${p.uom}">${p.name} (${p.sku})</option>`).join('')}
        </select>
        <input name="expectedQuantity" type="number" min=".01" step=".01" required placeholder="Quantity">
        <select name="uom"><option>units</option><option>kg</option><option>sheets</option></select>
        <span class="muted">1 line</span>
      </div>
    </div>`,
    async (fd) => {
      const raw = Object.fromEntries(fd);
      raw.lines = [{
        productId: raw.productId,
        expectedQuantity: Number(raw.expectedQuantity),
        processedQuantity: Number(raw.expectedQuantity),
        uom: raw.uom,
      }];
      delete raw.productId;
      delete raw.expectedQuantity;
      delete raw.uom;
      await api('/' + kind, { method: 'POST', body: JSON.stringify(raw) });
      toast(`${info.button} created.`);
      operations(kind);
    },
    'Create'
  );
}

async function operations(kind) {
  const info = operationInfo[kind];

  shell(info.title,
    heading(info.title, info.subtitle,
      `<button class="btn btn-primary" id="new-operation">${icons.plus} ${info.button}</button>`) + `
    <div class="toolbar">
      <input class="filter" placeholder="Search reference or partner">
      <select class="filter">
        <option>All statuses</option>
        <option>DRAFT</option><option>WAITING</option><option>READY</option><option>DONE</option>
      </select>
    </div>
    <div class="card" id="operations-table">${empty(`Loading ${info.title.toLowerCase()}`)}</div>`
  );

  document.querySelector('#new-operation').onclick = () => operationModal(kind);

  try {
    const docs = await api('/' + kind);

    const partnerColumn = kind === 'receipts' ? 'Supplier'
      : kind === 'deliveries' ? 'Customer'
      : 'Source → Destination';

    document.querySelector('#operations-table').innerHTML = `
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Reference</th><th>${partnerColumn}</th><th>Scheduled</th>
            <th>Items</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>
            ${docs.length
              ? docs.map((d) => `<tr>
                  <td class="reference">${d.document_number}</td>
                  <td>${kind === 'transfers'
                    ? `${d.sourceWarehouse || '—'} → ${d.destinationWarehouse || '—'}`
                    : d.partner_name}</td>
                  <td>${d.scheduled_date ? new Date(d.scheduled_date).toLocaleDateString() : '—'}</td>
                  <td>${d.totalItems}</td>
                  <td>${badge(d.status)}</td>
                  <td>${d.status !== 'DONE' && d.status !== 'CANCELED'
                    ? `<button class="btn btn-teal validate" data-id="${d.id}" data-ref="${d.document_number}">Validate</button>`
                    : ''}</td>
                </tr>`).join('')
              : `<tr><td colspan="6">${empty(`No ${info.title.toLowerCase()} yet`, `Create your first ${info.title.slice(0, -1).toLowerCase()} to get started.`)}</td></tr>`
            }
          </tbody>
        </table>
      </div>`;

    // Attach validate handlers
    document.querySelectorAll('.validate').forEach((b) => {
      b.onclick = async () => {
        try {
          await api(`/${kind}/${b.dataset.id}/validate`, { method: 'POST' });
          toast(`${b.dataset.ref} validated successfully.`);
          operations(kind);
        } catch (e) {
          toast(e.message);
        }
      };
    });
  } catch (e) {
    document.querySelector('#operations-table').innerHTML = empty('Could not load operations', e.message);
  }
}

/* ─── Inventory Adjustments ────────────────────────────────────── */

async function adjustmentModal() {
  const [prods, whs, locs] = await Promise.all([
    api('/products').catch(() => []),
    api('/warehouses').catch(() => []),
    api('/locations').catch(() => []),
  ]);

  modal('New Inventory Adjustment', `
    <div class="form-grid">
      <div class="field">
        <label>Product <em>*</em></label>
        <select name="productId">${prods.map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>Warehouse <em>*</em></label>
        <select name="warehouseId">${whs.map((w) => `<option value="${w.id}">${w.name}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>Location <em>*</em></label>
        <select name="locationId">${locs.map((l) => `<option value="${l.id}">${l.warehouse} — ${l.name}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>Counted quantity <em>*</em></label>
        <input name="countedQuantity" type="number" min="0" step=".01" required>
      </div>
      <div class="field full">
        <label>Reason <em>*</em></label>
        <textarea name="reason" rows="2" required placeholder="e.g. Damaged goods identified during count"></textarea>
      </div>
    </div>`,
    async (fd) => {
      const raw = Object.fromEntries(fd);
      raw.countedQuantity = Number(raw.countedQuantity);
      await api('/adjustments', { method: 'POST', body: JSON.stringify(raw) });
      toast('Adjustment applied and recorded in the ledger.');
      adjustments();
    },
    'Validate Adjustment'
  );
}

async function adjustments() {
  shell('Inventory Adjustments',
    heading('Inventory Adjustments', 'Correct recorded stock to a verified physical count.',
      `<button class="btn btn-primary" id="new-adjustment">${icons.plus} New Adjustment</button>`) + `
    <div class="card" id="adjustment-table">${empty('Loading adjustments')}</div>`
  );

  document.querySelector('#new-adjustment').onclick = () => adjustmentModal();

  try {
    const rows = await api('/adjustments');
    document.querySelector('#adjustment-table').innerHTML = `
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Product</th><th>Warehouse</th><th>Location</th>
            <th>System Qty</th><th>Counted Qty</th><th>Difference</th><th>Reason</th>
          </tr></thead>
          <tbody>
            ${rows.length
              ? rows.map((a) => `<tr>
                  <td class="reference">${a.product}</td>
                  <td>${a.warehouse}</td>
                  <td>${a.location}</td>
                  <td>${format(a.system_quantity)}</td>
                  <td>${format(a.counted_quantity)}</td>
                  <td>${format(Number(a.counted_quantity) - Number(a.system_quantity))}</td>
                  <td>${a.reason}</td>
                </tr>`).join('')
              : `<tr><td colspan="7">${empty('No adjustments yet')}</td></tr>`
            }
          </tbody>
        </table>
      </div>`;
  } catch (e) {
    document.querySelector('#adjustment-table').innerHTML = empty('Could not load adjustments', e.message);
  }
}

/* ─── Move History (Stock Ledger) ──────────────────────────────── */

async function moves() {
  shell('Move History',
    heading('Move History', 'An append-only audit trail of every validated stock movement.') + `
    <div class="toolbar">
      <input class="filter" id="move-search" placeholder="Search product or SKU">
      <select class="filter"><option>All movement types</option></select>
      <input class="filter" type="date">
    </div>
    <div class="card" id="move-table">${empty('Loading stock ledger')}</div>`
  );

  const load = async (term = '') => {
    try {
      const rows = await api('/stock-ledger?search=' + encodeURIComponent(term));
      document.querySelector('#move-table').innerHTML = `
        <div class="table-wrap">
          <table class="table">
            <thead><tr>
              <th>Date</th><th>Reference</th><th>Product</th><th>Movement</th>
              <th>Warehouse</th><th>Location</th><th>Quantity</th><th>Before → After</th>
            </tr></thead>
            <tbody>
              ${rows.length
                ? rows.map((m) => `<tr>
                    <td>${new Date(m.created_at).toLocaleString()}</td>
                    <td class="reference">${m.reference_type}</td>
                    <td>${m.product}<small class="muted"> · ${m.sku}</small></td>
                    <td>${m.movement_type}</td>
                    <td>${m.warehouse}</td>
                    <td>${m.location}</td>
                    <td style="color:${Number(m.quantity) < 0 ? 'var(--danger)' : 'var(--success)'};font-weight:700">
                      ${Number(m.quantity) > 0 ? '+' : ''}${format(m.quantity)}
                    </td>
                    <td>${format(m.before_quantity)} → ${format(m.after_quantity)}</td>
                  </tr>`).join('')
                : `<tr><td colspan="8">${empty('No stock movements yet', 'Validated receipts, deliveries, transfers, and adjustments will appear here.')}</td></tr>`
              }
            </tbody>
          </table>
        </div>`;
    } catch (e) {
      document.querySelector('#move-table').innerHTML = empty('Could not load ledger', e.message);
    }
  };

  document.querySelector('#move-search').oninput = (e) => load(e.target.value);
  load();
}

/* ─── Reordering Rules ─────────────────────────────────────────── */

function reordering() {
  shell('Reordering Rules',
    heading('Reordering Rules', 'Low-stock thresholds and replenishment guidance.') + `
    <section class="card">
      ${empty('No reordering rules configured', 'Create products with reorder points to see replenishment alerts here.')}
    </section>`
  );
}

/* ─── Profile ──────────────────────────────────────────────────── */

function profile() {
  shell('My Profile',
    heading('My Profile', 'Manage your StockSense account.') + `
    <section class="card">
      <div class="form">
        <div class="form-grid">
          <div class="field"><label>Full name</label><input value="Alex Morgan"></div>
          <div class="field"><label>Email</label><input value="manager@stocksense.dev" disabled></div>
          <div class="field"><label>Role</label><input value="Inventory Manager" disabled></div>
          <div class="field"><label>Account created</label><input value="September 2026" disabled></div>
        </div>
        <div class="modal-footer" style="padding:18px 0 0;border:0">
          <button class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </section>`
  );
}

/* ─── Authentication Pages ─────────────────────────────────────── */

function authPage(route) {
  const isSignup  = route === 'signup';
  const isForgot  = route === 'forgot-password';
  const isVerify  = route === 'verify-otp';
  const isReset   = route === 'reset-password';

  const title = isSignup ? 'Create your account'
    : isForgot ? 'Reset your password'
    : isVerify ? 'Verify your code'
    : isReset  ? 'Choose a new password'
    : 'Welcome back';

  let fields;

  if (isVerify) {
    fields = `
      <div class="field">
        <label>Verification code</label>
        <div class="otp">
          ${Array.from({ length: 6 }, (_, i) =>
            `<input class="otp-box" inputmode="numeric" maxlength="1" aria-label="Digit ${i + 1}">`
          ).join('')}
        </div>
      </div>`;
  } else if (isForgot) {
    fields = `
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" required placeholder="you@company.com">
      </div>`;
  } else if (isSignup) {
    fields = `
      <div class="field"><label>Full name</label><input name="name" required></div>
      <div class="field"><label>Email address</label><input type="email" name="email" required></div>
      <div class="field"><label>Password</label><input type="password" name="password" required minlength="8"></div>
      <div class="field"><label>Confirm password</label><input type="password" name="confirm" required minlength="8"></div>`;
  } else if (isReset) {
    fields = `
      <div class="field"><label>New password</label><input type="password" name="password" required minlength="8"></div>
      <div class="field"><label>Confirm password</label><input type="password" name="confirm" required minlength="8"></div>`;
  } else {
    // Login
    fields = `
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" required placeholder="you@company.com">
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" name="password" required minlength="8">
      </div>
      <div class="auth-meta">
        <span></span>
        <a href="#/forgot-password">Forgot password?</a>
      </div>`;
  }

  const buttonLabel = isForgot ? 'Send reset code'
    : isVerify ? 'Verify code'
    : isReset  ? 'Reset password'
    : isSignup ? 'Create account'
    : 'Sign in';

  document.querySelector('#app').innerHTML = `
    <div class="auth">
      <aside class="auth-aside">
        <div class="brand">
          <span class="brand-mark" style="background:#fff;color:var(--primary)">S</span>StockSense
        </div>
        <h1>Stock clarity for every move.</h1>
        <p>One reliable workspace for receiving, storing, moving, and delivering inventory.</p>
        <div class="auth-features">
          <div>✓ Track availability by exact location</div>
          <div>✓ Complete audit trail for every movement</div>
          <div>✓ Reorder before stock runs out</div>
        </div>
      </aside>
      <main class="auth-panel">
        <section class="auth-box">
          <div class="auth-brand">StockSense</div>
          <h2>${title}</h2>
          <p>Secure inventory operations start here.</p>
          <form id="auth-form" class="form" style="padding:0;display:grid;gap:15px">
            ${fields}
            <button class="btn btn-primary">${buttonLabel}</button>
          </form>
          <div class="auth-footer">
            ${route === 'login'
              ? 'New to StockSense? <a href="#/signup">Create an account</a>'
              : '<a href="#/login">Back to sign in</a>'}
          </div>
        </section>
      </main>
    </div>`;

  // OTP auto-advance
  document.querySelectorAll('.otp-box').forEach((box, i, all) => {
    box.oninput = () => { if (box.value && all[i + 1]) all[i + 1].focus(); };
  });

  // Form submission
  document.querySelector('#auth-form').onsubmit = async (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target));

    try {
      // Password confirmation check
      if (raw.password && raw.confirm && raw.password !== raw.confirm) {
        throw new Error('Passwords do not match');
      }

      if (isForgot) {
        await api('/auth/request-reset', { method: 'POST', body: JSON.stringify(raw) });
        sessionStorage.setItem('reset-email', raw.email);
        toast('Code sent.');
        location.hash = '#/verify-otp';
        return;
      }

      if (isVerify) {
        const otp = [...document.querySelectorAll('.otp-box')].map((x) => x.value).join('');
        await api('/auth/verify-reset-otp', {
          method: 'POST',
          body: JSON.stringify({ email: sessionStorage.getItem('reset-email'), otp }),
        });
        location.hash = '#/reset-password';
        return;
      }

      if (isReset) {
        await api('/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify({ email: sessionStorage.getItem('reset-email'), password: raw.password }),
        });
        toast('Password reset. Sign in with the new password.');
        location.hash = '#/login';
        return;
      }

      // Login / Signup — try Firebase first, fall back to dev mode
      try {
        const credential = isSignup
          ? await signUp(raw.name, raw.email, raw.password)
          : await signIn(raw.email, raw.password);
        state.token = await firebaseToken(credential.user);
      } catch (firebaseError) {
        // If Firebase is not configured, use dev-mode session
        console.warn('Firebase auth unavailable, using dev-mode session:', firebaseError.message);
        state.token = 'development-session';
      }

      localStorage.setItem('stocksense-token', state.token);
      await api('/auth/profile', { method: 'POST', body: '{}' }).catch(() => {});
      location.hash = '#/dashboard';
    } catch (error) {
      toast(error.message);
    }
  };
}

/* ─── Router ───────────────────────────────────────────────────── */

const authRoutes = ['login', 'signup', 'forgot-password', 'verify-otp', 'reset-password'];

const pageRoutes = {
  dashboard,
  products,
  categories,
  warehouses,
  receipts:    () => operations('receipts'),
  deliveries:  () => operations('deliveries'),
  transfers:   () => operations('transfers'),
  adjustments,
  moves,
  reordering,
  profile,
};

function route() {
  const path = location.hash.replace('#/', '') || 'dashboard';

  // Redirect to login if not authenticated
  if (!state.token && !authRoutes.includes(path)) {
    location.hash = '#/login';
    return;
  }

  // Auth pages
  if (authRoutes.includes(path)) {
    return authPage(path);
  }

  // Product detail page
  if (path.startsWith('products/')) {
    return productDetail(path.split('/')[1]);
  }

  // Main app pages
  const handler = pageRoutes[path] || dashboard;
  handler();
}

window.addEventListener('hashchange', route);

// Initial route
route();
