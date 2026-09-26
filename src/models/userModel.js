import pool from "@/lib/db";

export async function createUser(name, email, password) {
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, image, created_at, updated_at
    `,
    [name, email, password]
  );

  return result.rows[0];
}

export async function getUserByEmail(email) {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email]
  );

  return result.rows[0] || null;
}

export async function getUserById(id) {
  const result = await pool.query(
    `
      SELECT id, name, email, image, created_at, updated_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function updateUserName(id, name) {
  const result = await pool.query(
    `
      UPDATE users
      SET name = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, name, email, image, created_at, updated_at
    `,
    [name, id]
  );

  return result.rows[0] || null;
}