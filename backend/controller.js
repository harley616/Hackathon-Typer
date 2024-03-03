const db = require('./database');

const registerUser = async (req, res) => {
  const {name} = req.body;
  try {
    const user = await db.one('INSERT INTO users (name) VALUES($1) RETURNING *', [name]);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const postScore = async (req, res) => {
  const {score, name} = req.body;
  try {
    const res = await db.one('INSERT INTO scores (score, name) VALUES($1, $2) RETURNING *', [score, name]);
    console.log(res);
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}



module.exports = {
    registerUser,
    postScore
}