-- =========================================================
-- EchoGPT Database Schema
-- PostgreSQL
-- =========================================================


-- ---------------------------------------------------------
-- Users
-- Stores registered EchoGPT users.
-- Password contains the bcrypt hashed password.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ---------------------------------------------------------
-- Chats
-- Each chat belongs to one user.
-- Deleting a user automatically deletes their chats.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS chats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL DEFAULT 'New Chat',
  model VARCHAR(50) NOT NULL DEFAULT 'EchoGPT',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ---------------------------------------------------------
-- Messages
-- Each message belongs to one chat.
-- role examples:
--   user
--   assistant
--
-- Deleting a chat automatically deletes its messages.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER NOT NULL
    REFERENCES chats(id)
    ON DELETE CASCADE,

  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);