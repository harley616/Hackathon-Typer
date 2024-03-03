import React, {useState, useContext, useEffect} from 'react';
import Api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {context} from './root';
import '../styles/startStyle.css';
import getPoem from '../services/getPoem';




export default function Login() {
    const api = new Api();
    const [username, setUsername] = useState('');
    const {setUser, setMessage, setTest} = useContext(context);
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
    const [leaderBoardData, setLeaderBoardData] = useState(null);
    async function handleRegister(){
        console.log(`username: ${username}, difficulty: ${difficulty}`);
        const res = await api.register(username);
        if (res.error) {
            setMessage('Name already exists!')
        }
        else{
            console.log(res);
            setUser(res[0].name);
            setTest(await getPoem(difficulty))
            navigate('/game');
        }
    
    }

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const data = await api.getLeaderBoard();
            setLeaderBoardData(data);
        }
        fetchLeaderBoard();
    },[])

  return (
    <div className="leaderboard">
    <div className="container">
        <div className="top-scorers">
            <h2>Top Scorers</h2>
            <ul className="top-scorers-list">
                {
                Array.isArray(leaderBoardData) ? leaderBoardData.map((data, index) => {
                    return (
                        <li key={data.name}>{data.name} - {data.score}</li>
                    );
                }) : 
                    <li>Loading/Empty</li>
                }
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