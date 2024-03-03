import React from 'react';
import {Outlet} from 'react-router-dom';
import '../index.css';
import NavBar from '../components/navbar';

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}