import React, {useState, useContext} from 'react';
import Api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {context} from './root';





export default function Login() {
    const [username, setUsername] = useState('');
    const {setUser} = useContext(context);
    const navigate = useNavigate();
    async function handleRegister(){
        const api = new Api();
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
    <div>
      <h1>Login</h1>
      <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={() => handleRegister()}>Login</button>
    </div>
  );
}