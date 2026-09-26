import pool from "@/lib/db";

export async function createMessage(chatId, role, content) {
  const result = await pool.query(
    `
      INSERT INTO messages (chat_id, role, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [chatId, role, content]
  );

  return result.rows[0];
}

export async function getMessagesByChat(chatId) {
  const result = await pool.query(
    `
      SELECT *
      FROM messages
      WHERE chat_id = $1
      ORDER BY created_at ASC
    `,
    [chatId]
  );

  return result.rows;
}