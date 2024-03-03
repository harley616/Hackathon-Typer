import React, {useState, useContext} from 'react';
import Api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {context} from './root';
import '../styles/startStyle.css';





export default function Login() {
    const [username, setUsername] = useState('');
    const {setUser} = useContext(context);
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
    async function handleRegister(){
        const api = new Api();
        console.log(`username: ${username}, difficulty: ${difficulty}`);
        const res = await api.register(username);
        if (res.error) {
            console.error(res.error);
        }
        else{
            console.log(res);
            setUser(res.name);
            navigate('/game');
        }
    
    }

  return (
    <div className="leaderboard">
    <div className="container">
        <div className="top-scorers">
            <h2>Top Scorers</h2>
            <ul className="top-scorers-list">
                <li>John Doe - 250 points</li>
                <li>Jane Smith - 200 points</li>
                <li>Michael Johnson - 180 points</li>
            </ul>
        </div>
        <div className="leaderboard-form">
            
                <div className="leaderboard-form-group">
                    <label >Full Name</label>
                    <input type="text" id="full-name" onChange={(e) => setUsername(e.target.value)} name="fullName"/>
                </div>
                <div className="leaderboard-form-group">
                    <label>Difficulty</label>
                    <select id="difficulty" name="difficulty" onChange={(e) => {setDifficulty(e.target.value)}}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="leaderboard-form-group">
                    <button  className="leaderboard-submit-button" onClick={() => handleRegister()}>Submit</button>
                </div>
           
        </div>
    </div>
</div>
  );
}