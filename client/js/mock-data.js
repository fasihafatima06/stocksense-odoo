/**
 * StockSense — Mock Data Layer
 * Provides realistic demo data when the backend API is unavailable.
 * This allows the full UI to work standalone for demos and development.
 */

const WAREHOUSES = [
  { id: 'wh-1', name: 'Main Warehouse', code: 'MW', address: '123 Industrial Park, Sector 5', active: true },
  { id: 'wh-2', name: 'East Distribution Center', code: 'EDC', address: '456 Logistics Ave, Zone B', active: true },
];

const LOCATIONS = [
  { id: 'loc-1', warehouse_id: 'wh-1', warehouse: 'Main Warehouse', name: 'Rack A', code: 'MW-RA', location_type: 'INTERNAL' },
  { id: 'loc-2', warehouse_id: 'wh-1', warehouse: 'Main Warehouse', name: 'Rack B', code: 'MW-RB', location_type: 'INTERNAL' },
  { id: 'loc-3', warehouse_id: 'wh-1', warehouse: 'Main Warehouse', name: 'Receiving Bay', code: 'MW-RCV', location_type: 'RECEIVING' },
  { id: 'loc-4', warehouse_id: 'wh-2', warehouse: 'East Distribution Center', name: 'Shelf 1', code: 'EDC-S1', location_type: 'INTERNAL' },
  { id: 'loc-5', warehouse_id: 'wh-2', warehouse: 'East Distribution Center', name: 'Dispatch Area', code: 'EDC-DSP', location_type: 'DISPATCH' },
];

const CATEGORIES = [
  { id: 'cat-1', name: 'Raw Materials', description: 'Steel, wood, chemicals and base materials', productCount: 3, active: true },
  { id: 'cat-2', name: 'Finished Goods', description: 'Assembled products ready for sale', productCount: 2, active: true },
  { id: 'cat-3', name: 'Packaging', description: 'Boxes, wraps, and shipping supplies', productCount: 2, active: true },
  { id: 'cat-4', name: 'Office Supplies', description: 'Stationery, printer consumables', productCount: 1, active: true },
];

const PRODUCTS = [
  { id: 'p-1', name: 'Steel Rods (10mm)', sku: 'STL-001', category: 'Raw Materials', category_id: 'cat-1', uom: 'kg', onHand: 450, available: 420, reserved: 30, reorder_point: 100, reorder_quantity: 200, active: true },
  { id: 'p-2', name: 'Aluminum Sheets', sku: 'ALU-002', category: 'Raw Materials', category_id: 'cat-1', uom: 'sheets', onHand: 85, available: 75, reserved: 10, reorder_point: 50, reorder_quantity: 100, active: true },
  { id: 'p-3', name: 'Wooden Planks', sku: 'WD-003', category: 'Raw Materials', category_id: 'cat-1', uom: 'units', onHand: 12, available: 12, reserved: 0, reorder_point: 20, reorder_quantity: 50, active: true },
  { id: 'p-4', name: 'Office Chair (Ergonomic)', sku: 'FRN-010', category: 'Finished Goods', category_id: 'cat-2', uom: 'units', onHand: 65, available: 45, reserved: 20, reorder_point: 15, reorder_quantity: 30, active: true },
  { id: 'p-5', name: 'Standing Desk Frame', sku: 'FRN-011', category: 'Finished Goods', category_id: 'cat-2', uom: 'units', onHand: 28, available: 28, reserved: 0, reorder_point: 10, reorder_quantity: 20, active: true },
  { id: 'p-6', name: 'Cardboard Box (Large)', sku: 'PKG-020', category: 'Packaging', category_id: 'cat-3', uom: 'units', onHand: 350, available: 340, reserved: 10, reorder_point: 100, reorder_quantity: 500, active: true },
  { id: 'p-7', name: 'Bubble Wrap Roll', sku: 'PKG-021', category: 'Packaging', category_id: 'cat-3', uom: 'units', onHand: 5, available: 3, reserved: 2, reorder_point: 10, reorder_quantity: 25, active: true },
  { id: 'p-8', name: 'Printer Paper A4', sku: 'OFC-030', category: 'Office Supplies', category_id: 'cat-4', uom: 'boxes', onHand: 0, available: 0, reserved: 0, reorder_point: 5, reorder_quantity: 20, active: true },
];

let _nextDocNum = { RECEIPT: 6, DELIVERY: 4, TRANSFER: 3 };

const DOCUMENTS = [
  { id: 'd-1', document_type: 'RECEIPT', document_number: 'WH/IN/00001', partner_name: 'SteelCorp Pvt Ltd', sourceWarehouse: null, destinationWarehouse: 'Main Warehouse', source_warehouse_id: null, destination_warehouse_id: 'wh-1', source_location_id: null, destination_location_id: 'loc-3', scheduled_date: '2026-09-20', status: 'DONE', totalItems: 2, created_at: '2026-09-20T09:15:00Z', notes: 'Monthly steel delivery' },
  { id: 'd-2', document_type: 'RECEIPT', document_number: 'WH/IN/00002', partner_name: 'PackageMart', sourceWarehouse: null, destinationWarehouse: 'Main Warehouse', source_warehouse_id: null, destination_warehouse_id: 'wh-1', source_location_id: null, destination_location_id: 'loc-3', scheduled_date: '2026-09-22', status: 'DONE', totalItems: 1, created_at: '2026-09-22T11:30:00Z', notes: null },
  { id: 'd-3', document_type: 'RECEIPT', document_number: 'WH/IN/00003', partner_name: 'WoodWorks Inc.', sourceWarehouse: null, destinationWarehouse: 'Main Warehouse', source_warehouse_id: null, destination_warehouse_id: 'wh-1', source_location_id: null, destination_location_id: 'loc-1', scheduled_date: '2026-09-25', status: 'WAITING', totalItems: 1, created_at: '2026-09-24T08:00:00Z', notes: 'Awaiting truck arrival' },
  { id: 'd-4', document_type: 'RECEIPT', document_number: 'WH/IN/00004', partner_name: 'AluminaCo', sourceWarehouse: null, destinationWarehouse: 'East Distribution Center', source_warehouse_id: null, destination_warehouse_id: 'wh-2', source_location_id: null, destination_location_id: 'loc-4', scheduled_date: '2026-09-26', status: 'DRAFT', totalItems: 1, created_at: '2026-09-25T14:20:00Z', notes: null },
  { id: 'd-5', document_type: 'RECEIPT', document_number: 'WH/IN/00005', partner_name: 'OfficePro Supplies', sourceWarehouse: null, destinationWarehouse: 'Main Warehouse', source_warehouse_id: null, destination_warehouse_id: 'wh-1', source_location_id: null, destination_location_id: 'loc-2', scheduled_date: '2026-09-27', status: 'READY', totalItems: 1, created_at: '2026-09-25T16:00:00Z', notes: 'Printer paper restock' },
  { id: 'd-6', document_type: 'DELIVERY', document_number: 'WH/OUT/00001', partner_name: 'UrbanOffice Co.', sourceWarehouse: 'Main Warehouse', destinationWarehouse: null, source_warehouse_id: 'wh-1', destination_warehouse_id: null, source_location_id: 'loc-1', destination_location_id: null, scheduled_date: '2026-09-23', status: 'DONE', totalItems: 2, created_at: '2026-09-22T10:00:00Z', notes: 'Customer order #1055' },
  { id: 'd-7', document_type: 'DELIVERY', document_number: 'WH/OUT/00002', partner_name: 'HomeStyle Ltd', sourceWarehouse: 'Main Warehouse', destinationWarehouse: null, source_warehouse_id: 'wh-1', destination_warehouse_id: null, source_location_id: 'loc-2', destination_location_id: null, scheduled_date: '2026-09-26', status: 'READY', totalItems: 1, created_at: '2026-09-25T09:00:00Z', notes: null },
  { id: 'd-8', document_type: 'DELIVERY', document_number: 'WH/OUT/00003', partner_name: 'TechPark Interiors', sourceWarehouse: 'East Distribution Center', destinationWarehouse: null, source_warehouse_id: 'wh-2', destination_warehouse_id: null, source_location_id: 'loc-4', destination_location_id: null, scheduled_date: '2026-09-27', status: 'DRAFT', totalItems: 1, created_at: '2026-09-26T08:30:00Z', notes: 'Pending confirmation' },
  { id: 'd-9', document_type: 'TRANSFER', document_number: 'WH/INT/00001', partner_name: 'Internal Movement', sourceWarehouse: 'Main Warehouse', destinationWarehouse: 'East Distribution Center', source_warehouse_id: 'wh-1', destination_warehouse_id: 'wh-2', source_location_id: 'loc-1', destination_location_id: 'loc-4', scheduled_date: '2026-09-24', status: 'DONE', totalItems: 1, created_at: '2026-09-24T13:00:00Z', notes: 'Rebalance stock' },
  { id: 'd-10', document_type: 'TRANSFER', document_number: 'WH/INT/00002', partner_name: 'Rack Reorganization', sourceWarehouse: 'Main Warehouse', destinationWarehouse: 'Main Warehouse', source_warehouse_id: 'wh-1', destination_warehouse_id: 'wh-1', source_location_id: 'loc-1', destination_location_id: 'loc-2', scheduled_date: '2026-09-26', status: 'WAITING', totalItems: 2, created_at: '2026-09-25T15:45:00Z', notes: 'Moving steel to Rack B' },
];

const ADJUSTMENTS = [
  { id: 'adj-1', product: 'Steel Rods (10mm)', warehouse: 'Main Warehouse', location: 'Rack A', system_quantity: 455, counted_quantity: 450, reason: 'Damaged items found during physical count', created_at: '2026-09-25T10:00:00Z' },
  { id: 'adj-2', product: 'Bubble Wrap Roll', warehouse: 'Main Warehouse', location: 'Rack B', system_quantity: 8, counted_quantity: 5, reason: 'Used for internal packing, not tracked', created_at: '2026-09-25T11:30:00Z' },
];

const LEDGER = [
  { id: 'sl-1', product: 'Steel Rods (10mm)', sku: 'STL-001', warehouse: 'Main Warehouse', location: 'Receiving Bay', movement_type: 'RECEIPT', reference_type: 'RECEIPT', quantity: 200, before_quantity: 250, after_quantity: 450, created_at: '2026-09-20T09:20:00Z' },
  { id: 'sl-2', product: 'Cardboard Box (Large)', sku: 'PKG-020', warehouse: 'Main Warehouse', location: 'Rack B', movement_type: 'RECEIPT', reference_type: 'RECEIPT', quantity: 500, before_quantity: 0, after_quantity: 500, created_at: '2026-09-22T11:35:00Z' },
  { id: 'sl-3', product: 'Office Chair (Ergonomic)', sku: 'FRN-010', warehouse: 'Main Warehouse', location: 'Rack A', movement_type: 'DELIVERY', reference_type: 'DELIVERY', quantity: -10, before_quantity: 75, after_quantity: 65, created_at: '2026-09-23T10:15:00Z' },
  { id: 'sl-4', product: 'Cardboard Box (Large)', sku: 'PKG-020', warehouse: 'Main Warehouse', location: 'Rack B', movement_type: 'DELIVERY', reference_type: 'DELIVERY', quantity: -150, before_quantity: 500, after_quantity: 350, created_at: '2026-09-23T10:20:00Z' },
  { id: 'sl-5', product: 'Aluminum Sheets', sku: 'ALU-002', warehouse: 'Main Warehouse', location: 'Rack A', movement_type: 'INTERNAL_TRANSFER_OUT', reference_type: 'TRANSFER', quantity: -15, before_quantity: 100, after_quantity: 85, created_at: '2026-09-24T13:10:00Z' },
  { id: 'sl-6', product: 'Aluminum Sheets', sku: 'ALU-002', warehouse: 'East Distribution Center', location: 'Shelf 1', movement_type: 'INTERNAL_TRANSFER_IN', reference_type: 'TRANSFER', quantity: 15, before_quantity: 0, after_quantity: 15, created_at: '2026-09-24T13:10:00Z' },
  { id: 'sl-7', product: 'Steel Rods (10mm)', sku: 'STL-001', warehouse: 'Main Warehouse', location: 'Rack A', movement_type: 'ADJUSTMENT_OUT', reference_type: 'ADJUSTMENT', quantity: -5, before_quantity: 455, after_quantity: 450, created_at: '2026-09-25T10:05:00Z' },
  { id: 'sl-8', product: 'Bubble Wrap Roll', sku: 'PKG-021', warehouse: 'Main Warehouse', location: 'Rack B', movement_type: 'ADJUSTMENT_OUT', reference_type: 'ADJUSTMENT', quantity: -3, before_quantity: 8, after_quantity: 5, created_at: '2026-09-25T11:35:00Z' },
];

/* ─── Mock API Handler ───────────────────────────────────────── */

function filterBySearch(items, term, ...fields) {
  if (!term) return items;
  const lower = term.toLowerCase();
  return items.filter((item) => fields.some((f) => String(item[f] || '').toLowerCase().includes(lower)));
}

export function mockApi(path) {
  const url = new URL(path, 'http://localhost');
  const p = url.pathname;
  const search = url.searchParams.get('search') || '';

  // Dashboard
  if (p === '/dashboard/summary') {
    return {
      totalProducts: PRODUCTS.filter((x) => x.onHand > 0).length,
      lowStock: PRODUCTS.filter((x) => x.available > 0 && x.available <= x.reorder_point).length,
      outOfStock: PRODUCTS.filter((x) => x.available <= 0).length,
      pendingReceipts: DOCUMENTS.filter((d) => d.document_type === 'RECEIPT' && d.status !== 'DONE' && d.status !== 'CANCELED').length,
      pendingDeliveries: DOCUMENTS.filter((d) => d.document_type === 'DELIVERY' && d.status !== 'DONE' && d.status !== 'CANCELED').length,
      scheduledTransfers: DOCUMENTS.filter((d) => d.document_type === 'TRANSFER' && d.status !== 'DONE' && d.status !== 'CANCELED').length,
    };
  }

  if (p === '/dashboard/recent-operations') {
    return [...DOCUMENTS].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8);
  }

  if (p === '/dashboard/stock-alerts') {
    return PRODUCTS.filter((x) => x.available <= x.reorder_point).sort((a, b) => a.available - b.available).slice(0, 8);
  }

  if (p === '/dashboard/stock-by-category') {
    const map = {};
    PRODUCTS.forEach((pr) => { const cat = pr.category || 'Uncategorized'; map[cat] = (map[cat] || 0) + pr.onHand; });
    return Object.entries(map).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }

  // Products
  if (p === '/products') {
    return filterBySearch(PRODUCTS, search, 'name', 'sku');
  }

  if (p.startsWith('/products/')) {
    const id = p.split('/')[2];
    const prod = PRODUCTS.find((x) => x.id === id);
    if (!prod) throw new Error('Product not found');
    return {
      ...prod,
      balances: [
        { warehouse: 'Main Warehouse', location: 'Rack A', on_hand: Math.round(prod.onHand * 0.6), reserved: prod.reserved, available: Math.round(prod.onHand * 0.6) - prod.reserved },
        { warehouse: 'Main Warehouse', location: 'Rack B', on_hand: Math.round(prod.onHand * 0.25), reserved: 0, available: Math.round(prod.onHand * 0.25) },
        { warehouse: 'East Distribution Center', location: 'Shelf 1', on_hand: prod.onHand - Math.round(prod.onHand * 0.6) - Math.round(prod.onHand * 0.25), reserved: 0, available: prod.onHand - Math.round(prod.onHand * 0.6) - Math.round(prod.onHand * 0.25) },
      ].filter((b) => b.on_hand > 0),
    };
  }

  // Categories
  if (p === '/categories') return CATEGORIES;

  // Warehouses & Locations
  if (p === '/warehouses') return WAREHOUSES;
  if (p === '/locations') return LOCATIONS;

  // Operations
  if (p === '/receipts') return DOCUMENTS.filter((d) => d.document_type === 'RECEIPT');
  if (p === '/deliveries') return DOCUMENTS.filter((d) => d.document_type === 'DELIVERY');
  if (p === '/transfers') return DOCUMENTS.filter((d) => d.document_type === 'TRANSFER');

  // Adjustments
  if (p === '/adjustments') return ADJUSTMENTS;

  // Stock Ledger
  if (p === '/stock-ledger') {
    return filterBySearch(
      [...LEDGER].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
      search, 'product', 'sku'
    );
  }

  // Auth
  if (p === '/auth/profile') return { name: 'Alex Morgan', email: 'manager@stocksense.dev' };
  if (p === '/auth/request-reset') return { message: 'If the account exists, a reset code has been sent.' };
  if (p === '/auth/verify-reset-otp') return { verified: true };
  if (p === '/auth/reset-password') return { message: 'Password reset successfully' };

  return {};
}

/** Handle mock POST/write operations */
export function mockWrite(path, body) {
  if (path === '/products') {
    const p = {
      id: 'p-' + Date.now(),
      name: body.name,
      sku: body.sku,
      category: CATEGORIES.find((c) => c.id === body.categoryId)?.name || 'Uncategorized',
      category_id: body.categoryId || null,
      uom: body.uom || 'units',
      onHand: 0, available: 0, reserved: 0,
      reorder_point: Number(body.reorderPoint) || 0,
      reorder_quantity: Number(body.reorderQuantity) || 0,
      active: true,
    };
    PRODUCTS.push(p);
    return p;
  }

  if (path === '/categories') {
    const c = { id: 'cat-' + Date.now(), name: body.name, description: body.description || '', productCount: 0, active: true };
    CATEGORIES.push(c);
    return c;
  }

  if (path === '/warehouses') {
    const w = { id: 'wh-' + Date.now(), name: body.name, code: body.code, address: body.address || '', active: true };
    WAREHOUSES.push(w);
    return w;
  }

  if (path === '/locations') {
    const wh = WAREHOUSES.find((w) => w.id === body.warehouseId);
    const l = { id: 'loc-' + Date.now(), warehouse_id: body.warehouseId, warehouse: wh?.name || '', name: body.name, code: body.code, location_type: body.locationType || 'INTERNAL' };
    LOCATIONS.push(l);
    return l;
  }

  if (['/receipts', '/deliveries', '/transfers'].includes(path)) {
    const typeMap = { '/receipts': 'RECEIPT', '/deliveries': 'DELIVERY', '/transfers': 'TRANSFER' };
    const type = typeMap[path];
    const prefix = type === 'RECEIPT' ? 'WH/IN' : type === 'DELIVERY' ? 'WH/OUT' : 'WH/INT';
    const num = _nextDocNum[type]++;
    const d = {
      id: 'd-' + Date.now(),
      document_type: type,
      document_number: `${prefix}/${String(num).padStart(5, '0')}`,
      partner_name: body.partnerName,
      sourceWarehouse: WAREHOUSES.find((w) => w.id === body.sourceWarehouseId)?.name || null,
      destinationWarehouse: WAREHOUSES.find((w) => w.id === body.destinationWarehouseId)?.name || null,
      source_warehouse_id: body.sourceWarehouseId || null,
      destination_warehouse_id: body.destinationWarehouseId || null,
      source_location_id: body.sourceLocationId || null,
      destination_location_id: body.destinationLocationId || null,
      scheduled_date: body.scheduledDate || null,
      status: body.status || 'DRAFT',
      totalItems: body.lines?.length || 1,
      created_at: new Date().toISOString(),
      notes: body.notes || null,
    };
    DOCUMENTS.push(d);
    return d;
  }

  if (path === '/adjustments') {
    const prod = PRODUCTS.find((x) => x.id === body.productId);
    const wh = WAREHOUSES.find((x) => x.id === body.warehouseId);
    const loc = LOCATIONS.find((x) => x.id === body.locationId);
    const sysQty = prod ? prod.onHand : 0;
    const diff = Number(body.countedQuantity) - sysQty;
    const adj = {
      id: 'adj-' + Date.now(),
      product: prod?.name || 'Unknown',
      warehouse: wh?.name || 'Unknown',
      location: loc?.name || 'Unknown',
      system_quantity: sysQty,
      counted_quantity: Number(body.countedQuantity),
      reason: body.reason,
      created_at: new Date().toISOString(),
    };
    ADJUSTMENTS.push(adj);
    if (prod) { prod.onHand += diff; prod.available += diff; }
    LEDGER.unshift({
      id: 'sl-' + Date.now(), product: prod?.name, sku: prod?.sku, warehouse: wh?.name, location: loc?.name,
      movement_type: diff > 0 ? 'ADJUSTMENT_IN' : 'ADJUSTMENT_OUT', reference_type: 'ADJUSTMENT',
      quantity: diff, before_quantity: sysQty, after_quantity: sysQty + diff, created_at: new Date().toISOString(),
    });
    return adj;
  }

  // Validate operations
  if (path.match(/\/(receipts|deliveries|transfers)\/[^/]+\/validate/)) {
    const parts = path.split('/');
    const docId = parts[2];
    const doc = DOCUMENTS.find((d) => d.id === docId);
    if (doc) {
      doc.status = 'DONE';
      return { message: `${doc.document_number} validated successfully` };
    }
  }

  return {};
}
