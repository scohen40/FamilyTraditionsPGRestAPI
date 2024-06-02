const sql = require('./config');

const query = async (text, params) => {
  try {
    return await sql.unsafe(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

module.exports = {
  query,
};
