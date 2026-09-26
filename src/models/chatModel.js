import pool from "@/lib/db";

export async function createChat(userId, title = "New Chat", model = "EchoGPT") {
  const result = await pool.query(
    `
      INSERT INTO chats (user_id, title, model)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [userId, title, model]
  );

  return result.rows[0];
}

export async function getChatsByUser(userId) {
  const result = await pool.query(
    `
      SELECT *
      FROM chats
      WHERE user_id = $1
      ORDER BY updated_at DESC
    `,
    [userId]
  );

  return result.rows;
}

export async function getChatById(chatId, userId) {
  const result = await pool.query(
    `
      SELECT *
      FROM chats
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `,
    [chatId, userId]
  );

  return result.rows[0] || null;
}

export async function renameChat(chatId, userId, title) {
  const result = await pool.query(
    `
      UPDATE chats
      SET title = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `,
    [title, chatId, userId]
  );

  return result.rows[0] || null;
}

export async function deleteChat(chatId, userId) {
  const result = await pool.query(
    `
      DELETE FROM chats
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `,
    [chatId, userId]
  );

  return result.rows[0] || null;
}

export async function updateChatActivity(chatId, userId) {
  const result = await pool.query(
    `
      UPDATE chats
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `,
    [chatId, userId]
  );

  return result.rows[0] || null;
}

export async function updateChatModel(chatId, userId, model) {
  const result = await pool.query(
    `
      UPDATE chats
      SET model = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `,
    [model, chatId, userId]
  );

  return result.rows[0] || null;
}