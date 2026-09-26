import { ApiError } from '../utils/api-error.js';

export async function changeStock(client, { productId, warehouseId, locationId, delta, movementType, referenceType, referenceId, userId, notes }) {
  const locked = await client.query('SELECT id, on_hand FROM stock_balances WHERE product_id=$1 AND location_id=$2 FOR UPDATE', [productId, locationId]);
  let before = 0, balanceId;
  if (locked.rowCount) { before = Number(locked.rows[0].on_hand); balanceId = locked.rows[0].id; }
  const after = before + Number(delta);
  if (after < 0) throw new ApiError(409, 'Insufficient available stock', 'STOCK_INSUFFICIENT');
  if (balanceId) await client.query('UPDATE stock_balances SET on_hand=$1, updated_at=now() WHERE id=$2', [after, balanceId]);
  else await client.query('INSERT INTO stock_balances(product_id, warehouse_id, location_id, on_hand) VALUES($1,$2,$3,$4)', [productId, warehouseId, locationId, after]);
  await client.query(`INSERT INTO stock_ledger(product_id, warehouse_id, location_id, movement_type, quantity, reference_type, reference_id, before_quantity, after_quantity, performed_by, notes)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [productId, warehouseId, locationId, movementType, delta, referenceType, referenceId, before, after, userId, notes || null]);
  return { before, after };
}

export async function validateDocument(client, document, userId) {
  const lines = await client.query('SELECT * FROM document_lines WHERE document_id=$1 FOR UPDATE', [document.id]);
  if (!lines.rowCount) throw new ApiError(422, 'Add at least one product line before validating', 'NO_LINES');
  for (const line of lines.rows) {
    const qty = Number(line.processed_quantity || line.expected_quantity);
    if (qty <= 0) throw new ApiError(422, 'Processed quantity must be greater than zero', 'INVALID_QUANTITY');
    if (document.document_type === 'RECEIPT') await changeStock(client, { productId: line.product_id, warehouseId: document.destination_warehouse_id, locationId: document.destination_location_id, delta: qty, movementType: 'RECEIPT', referenceType: 'RECEIPT', referenceId: document.id, userId, notes: document.notes });
    if (document.document_type === 'DELIVERY') await changeStock(client, { productId: line.product_id, warehouseId: document.source_warehouse_id, locationId: document.source_location_id, delta: -qty, movementType: 'DELIVERY', referenceType: 'DELIVERY', referenceId: document.id, userId, notes: document.notes });
    if (document.document_type === 'TRANSFER') {
      await changeStock(client, { productId: line.product_id, warehouseId: document.source_warehouse_id, locationId: document.source_location_id, delta: -qty, movementType: 'INTERNAL_TRANSFER_OUT', referenceType: 'TRANSFER', referenceId: document.id, userId, notes: document.notes });
      await changeStock(client, { productId: line.product_id, warehouseId: document.destination_warehouse_id, locationId: document.destination_location_id, delta: qty, movementType: 'INTERNAL_TRANSFER_IN', referenceType: 'TRANSFER', referenceId: document.id, userId, notes: document.notes });
    }
  }
  await client.query("UPDATE documents SET status='DONE', updated_at=now() WHERE id=$1", [document.id]);
}
