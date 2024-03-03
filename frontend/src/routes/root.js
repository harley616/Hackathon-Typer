import React, {createContext, useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import '../index.css';
import '../styles/startStyle.css';
import leaf from '../styles/leaf1.png';
import Message from '../components/message';
export const context = createContext();

export default function Root() {
    const [user, setUser] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [test, setTest] = useState(['']);
    const navigate = useNavigate();
    let location = useLocation();
    setTimeout(() => {
        setMessage('');
    }, 5000);

  return (
    <context.Provider value={{user, setUser, score, setScore, setMessage, test, setTest}}>
        {message && <Message message={message}/>}

        {location.pathname === '/' && 
        <div className="index">
            <div className="container">
                <div className="decoration">
                    {/* <!-- Philodendron leaves --> */}
                    <img src={leaf} className="leaf leaf1" alt="Leaf 1"/>
                    <img src={leaf} className="leaf leaf2" alt="Leaf 2"/>
                    {/* <!-- End of Philodendron leaves --> */}
                </div>
                
                <header>
                    <div className="big_button">
                        <button onClick = {() => navigate('/login')}>Start Game</button>
                    </div>
                </header>
            </div>
        </div>
        }
        <Outlet />
    </context.Provider>
  );
}