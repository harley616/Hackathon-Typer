const db = require('./database');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.one('INSERT INTO users(name) VALUES($1, $2) RETURNING *', [username, password]);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  next();
}



module.exports = {
    registerUser
}