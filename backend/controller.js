const db = require('./database');

const registerUser = async (req, res) => {
  const {name} = req.body;
  try {
    const user = await db.any('INSERT INTO users (name) VALUES($1) RETURNING *', [name]);
    // console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const postScore = async (req, res) => {
  console.log('req.body', req.body)
  const {name, score} = req.body;
  try {
    const result = await db.one('INSERT INTO scores (score, name) VALUES($1, $2) RETURNING *', [score, name]);
    // console.log(res);
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const getLeaderBoard = async (req, res) => {
    try {
        const result = await db.any('SELECT * FROM scores ORDER BY score DESC LIMIT 10');
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
    
}



module.exports = {
    registerUser,
    postScore,
    getLeaderBoard
}