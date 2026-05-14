/**
 * Serializa recursivamente um valor para ser seguro em JSON.
 * - BigInt   → string numérica        ("123")
 * - Date     → string ISO 8601        ("2026-05-12T00:00:00.000Z")
 * - Decimal  → string numérica        ("99.90")  — Prisma @db.Decimal
 * - Buffer   → string base64          ("aGVsbG8=") — Prisma Bytes
 * - undefined→ null
 * - NaN/Inf  → null
 * - Array    → cada item serializado
 * - Object   → cada valor serializado
 */
export function serialize(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Buffer.isBuffer(value)) return value.toString('base64');
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) return null;
    return value;
  }
  if (Array.isArray(value)) return value.map(serialize);
  if (typeof value === 'object') {
    // Decimal do Prisma: possui método toFixed mas não é Date nem Buffer
    const obj = value as Record<string, unknown>;
    if (typeof obj['toFixed'] === 'function')
      return String(
        (obj['toFixed'] as (d: number) => string)(20).replace(/\.?0+$/, ''),
      );
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, serialize(v)]),
    );
  }
  return value;
}
