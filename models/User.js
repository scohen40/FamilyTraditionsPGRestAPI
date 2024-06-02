const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

client.connect();

async function createUserTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    profile_image_url VARCHAR(255),
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMPTZ CHECK (last_login IS NULL OR last_login >= creation_date)
);
  `;

  await client.query(query);
}

async function saveUser(user) {
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);

  const query = `
    INSERT INTO users (username, password, email, firstName, lastName)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [user.username, user.password, user.email, user.firstName, user.lastName];

  const result = await client.query(query, values);

  return result.rows[0];
}

module.exports = {
  createUserTable,
  saveUser
};