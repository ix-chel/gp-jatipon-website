import fs from 'fs';
import path from 'path';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in environment.');
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  console.log('Connected to database.');

  const migrationPath = path.resolve('supabase/migrations/20260924100000_create_boosts_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('Applying migration...');
  await client.query(sql);
  console.log('Migration applied successfully.');

  // Check columns in boosts table
  const res = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'boosts'
    ORDER BY ordinal_position;
  `);
  console.log('Boosts table columns:');
  console.table(res.rows);

} catch (err) {
  console.error('Migration failed:', err);
  process.exit(1);
} finally {
  await client.end();
}
