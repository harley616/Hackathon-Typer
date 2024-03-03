import React from 'react';
import {Outlet} from 'react-router-dom';
import '../index.css';

export default function Root() {
  return (
    <div>
      <h1 className='text-red-400'>Root</h1>
      <Outlet />
    </div>
  );
}