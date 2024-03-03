import React, {useState, useContext, useEffect, useMemo} from 'react';
import Api from '../services/api';
import { useNavigate, useLoaderData } from 'react-router-dom';
import {context} from './root';
import '../styles/startStyle.css';
import getPoem from '../services/getPoem';
// import { get, use } from '../../../backend/router';




export default function Login() {
    // function useLeaderBoard(){
    //     let data = useLoaderData();
    //     setLeaderBoardData(data);
    // }
    const api = useMemo(() => new Api(), []);
    const [username, setUsername] = useState('');
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    const {setUser, setMessage, setTest, test} = useContext(context);
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
    // const [leaderBoardData, setLeaderBoardData] = useState(loaderData);
    async function handleRegister(){
        console.log(`username: ${username}, difficulty: ${difficulty}`);
        const res = await api.register(username);
        if (res.error) {
            setMessage('Name already exists!')
        }
        else{
            console.log(res);
            setUser(res[0].name);
            setTest(await getPoem(difficulty));
            console.log(test)
            navigate('/game');
        }
    
    }

    useEffect(() => {
       const getLeaderBoard = async () => {
           const data = await api.getLeaderBoard();
           setLeaderBoardData(data);
       }
       getLeaderBoard();
    }, [] 
    );
    

    

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