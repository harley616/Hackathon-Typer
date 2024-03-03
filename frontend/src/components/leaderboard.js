import React, {useState} from 'react';
import Api from '../services/api';
import '../styles/startStyle.css';

export default function LeaderBoard(){
    const api = new Api();
    const [leaderBoardData] = useState(api.getLeaderBoard());

    return (
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
    );
}