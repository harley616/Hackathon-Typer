import React, {createContext, useState} from 'react';
import {Outlet} from 'react-router-dom';
import '../index.css';
import NavBar from '../components/navbar';

export const context = createContext();

export default function Root() {
    const [user, setUser] = useState('');
    const [score, setScore] = useState(0);

  return (
    <div>
        <context.Provider value={{user, setUser, score, setScore}}>
      <NavBar />
      <Outlet />
        </context.Provider>
    </div>
  );
}